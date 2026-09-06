import {
    getFirestore,
    collection,
    query,
    orderBy,
    onSnapshot,
    getDocs,
  } from '@react-native-firebase/firestore';
  import type { QueryDocumentSnapshot } from '@react-native-firebase/firestore';
  import type { ChatRoom } from '../../models/chatRooms';
  
  function roomsQuery() {
    return query(
      collection(getFirestore(), 'rooms'),
      orderBy('lastMessage.createdAt', 'desc'),
    );
  }
  
  function toChatRoom(doc: QueryDocumentSnapshot): ChatRoom { // Konverterer et Firestore-dokument til en ChatRoom
    const data = doc.data();
    return {
      id: doc.id,
      name: data.name ?? '',
      description: data.description ?? '',
      lastMessageAt: data.lastMessage?.createdAt?.toDate() ?? null,
    };
  }
  
  export function observeRooms( // Lytter på ændringer i chatrum og kalder onChange, når der er nye chatrum
    onChange: (rooms: ChatRoom[]) => void,
    onError: (error: Error) => void,
  ): () => void {
    return onSnapshot(
      roomsQuery(),
      snapshot => onChange(snapshot.docs.map(toChatRoom)),
      error => onError(error as Error),
    );
  }
  
  export async function fetchRooms(): Promise<ChatRoom[]> {
    const snapshot = await getDocs(roomsQuery());
    return snapshot.docs.map(toChatRoom);
  }