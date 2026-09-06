import { useEffect, useState } from 'react';
import {observeMessages,sendMessage,} from '../service/firebase/messageRepository';
import type { Message } from '../models/messages';
import type { AppUser } from '../models/user';

export function useMessages(roomId: string, currentUser: AppUser | null) { // Henter og sender beskeder i et chatrum
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = observeMessages( // Lytter på beskeder i chatrummet og opdaterer state, når der er nye beskeder
      roomId,
      next => {
        setMessages(next);
        setLoading(false);
      },
      err => {
        setError(err.message);
        setLoading(false);
      },
    );
    return unsubscribe;
  }, [roomId]);

  const send = async (text: string) => { 
    if (!currentUser) {
      return;
    }
    try {
      await sendMessage(roomId, currentUser, text); 
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return { messages, loading, error, send };
}