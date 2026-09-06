export interface Message { // Definerer strukturen for en besked i et chatrum
    id: string;
    text: string;
    senderId: string;
    senderName: string;
    senderPhotoUrl: string | null;
    createdAt: Date | null;
  }