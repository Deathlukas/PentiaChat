import { useEffect, useState, useCallback } from 'react';
import {observeMessages,sendMessage,loadOlderMessages} from '../service/firebase/messageRepository';
import type { Message } from '../models/messages';
import type { AppUser } from '../models/user';


function mergeSorted(a: Message[], b: Message[]): Message[] { // Fletter to lister, fjerner dubleter (efter id) og sorterer efter createdAt i faldende rækkefølge
    const map = new Map<string, Message>();
    for (const m of [...a, ...b]) {
      map.set(m.id, m);
    }
    return [...map.values()].sort(
      (x, y) =>
        (y.createdAt?.getTime() ?? Infinity) -
        (x.createdAt?.getTime() ?? Infinity),
    );
  }

  export function useMessages(roomId: string, currentUser: AppUser | null) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(true);
    const [loadingOlder, setLoadingOlder] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      setMessages([]);
      setHasMore(true);
      setLoading(true);
      const unsubscribe = observeMessages(
        roomId,
        live => {
          setMessages(prev => mergeSorted(prev, live));
          setLoading(false);
        },
        err => {
          setError(err.message);
          setLoading(false);
        },
      );
      return unsubscribe;
    }, [roomId]);
  
    const loadOlder = useCallback(async () => {
      if (loadingOlder || !hasMore) {
        return;
      }
      const oldest = messages[messages.length - 1];
      if (!oldest?.createdAt) {
        return;
      }
      setLoadingOlder(true);
      try {
        const result = await loadOlderMessages(roomId, oldest.createdAt);
        setMessages(prev => mergeSorted(prev, result.messages));
        setHasMore(result.hasMore);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoadingOlder(false);
      }
    }, [roomId, messages, loadingOlder, hasMore]);
  
    const send = useCallback(
      async (text: string) => {
        if (!currentUser) {
          return;
        }
        try {
          await sendMessage(roomId, currentUser, text);
        } catch (err) {
          setError((err as Error).message);
        }
      },
      [roomId, currentUser],
    );
  
    return { messages, loading, loadingOlder, hasMore, error, send, loadOlder };
  }