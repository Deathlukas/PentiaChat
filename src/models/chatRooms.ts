export interface ChatRoom { // Interface for et chatrum, der indeholder id, navn, beskrivelse og tidspunkt for den sidste besked.
    id: string;
    name: string;
    description: string;
    lastMessageAt: Date | null;
  }