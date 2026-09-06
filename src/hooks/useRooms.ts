import { useCallback, useEffect, useState } from 'react';
import { observeRooms, fetchRooms } from '../service/firebase/roomRepository';
import type { ChatRoom } from '../models/chatRooms';

export function useRooms() { // Hook til at observere og hente chatrum fra Firebase.
  const [rooms, setRooms] = useState<ChatRoom[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = observeRooms(
      nextRooms => {
        setRooms(nextRooms);
        setLoading(false);
      },
      err => {
        setError(err.message);
        setLoading(false);
      },
    );
    return unsubscribe;
  }, []);

  const refresh = useCallback(async () => { // Henter chatrum manuelt og opdaterer tilstanden.
    setRefreshing(true);
    try {
      setRooms(await fetchRooms());
      setError(null);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setRefreshing(false);
    }
  }, []);

  return { rooms, loading, refreshing, error, refresh };
}