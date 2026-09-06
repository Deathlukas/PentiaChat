import {getFirestore,collection,doc,query,orderBy,limit,onSnapshot,writeBatch,serverTimestamp,getDocs,startAfter,Timestamp} from '@react-native-firebase/firestore';
  import type { QueryDocumentSnapshot } from '@react-native-firebase/firestore';
  import type { Message } from '../../models/messages';
  import type { AppUser } from '../../models/user';
  
  const PAGE_SIZE = 10; // Antal beskeder, der hentes pr. Kan ændres alt efer behov 10 er for testing
  
  function messagesCollection(roomId: string) { // Returnerer en reference til besked-samlingen for et givent chatrum
    return collection(getFirestore(), 'rooms', roomId, 'messages');
  }
  
  function toMessage(snap: QueryDocumentSnapshot): Message { // Konverterer et Firestore-dokument til en Message
    const data = snap.data();
    return {
      id: snap.id,
      text: data.text ?? '',
      senderId: data.senderId ?? '',
      senderName: data.senderName ?? 'Ukendt',
      senderPhotoUrl: data.senderPhotoUrl ?? null,
      createdAt: data.createdAt?.toDate() ?? null,
    };
  }
  
  export function observeMessages( // Lytter på beskeder i et chatrum og kalder onChange, når der er nye beskeder
    roomId: string,
    onChange: (messages: Message[]) => void,
    onError: (error: Error) => void,
  ): () => void {
    const q = query(
      messagesCollection(roomId),
      orderBy('createdAt', 'desc'),
      limit(PAGE_SIZE),
    );
    return onSnapshot(
      q,
      snapshot => onChange(snapshot.docs.map(toMessage)),
      err => onError(err as Error),
    );
  }
  
  export async function sendMessage( // Sender en besked i et chatrum
    roomId: string,
    sender: AppUser,
    text: string,
  ): Promise<void> {
    const trimmed = text.trim();
    if (!trimmed) {
      return;
    }
    const db = getFirestore();
    const batch = writeBatch(db);
  
    batch.set(doc(messagesCollection(roomId)), { // Tilføjer en ny besked til chatrummet
      text: trimmed,
      senderId: sender.uid,
      senderName: sender.displayName ?? 'Ukendt',
      senderPhotoUrl: sender.photoURL ?? null,
      createdAt: serverTimestamp(),
    });
    batch.update(doc(db, 'rooms', roomId), {
      lastMessage: { text: trimmed, createdAt: serverTimestamp() },
    });
  
    await batch.commit();
}
export async function loadOlderMessages( // Henter ældre beskeder i et chatrum, senere end 50 sidste
    roomId: string,
    before: Date,
  ): Promise<{ messages: Message[]; hasMore: boolean }> {
    const q = query(
      messagesCollection(roomId),
      orderBy('createdAt', 'desc'),
      startAfter(Timestamp.fromDate(before)),
      limit(PAGE_SIZE),
    );
    const snapshot = await getDocs(q);
    return {
      messages: snapshot.docs.map(toMessage),
      hasMore: snapshot.docs.length === PAGE_SIZE,
    };
}