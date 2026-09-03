import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { getAuth, onAuthStateChanged } from '@react-native-firebase/auth';
import type { User } from '@react-native-firebase/auth';
import type { AppUser } from '../models/user';

interface AuthContextValue {
  user: AppUser | null;
  initializing: boolean;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function toAppUser(user: User | null): AppUser | null {
  if (!user) {
    return null;
  }
  return {
    uid: user.uid,
    displayName: user.displayName,
    photoURL: user.photoURL,
  };
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), firebaseUser => {
      setUser(toAppUser(firebaseUser));
      setInitializing(false);
    });
    return unsubscribe;
  }, []);

  const value = useMemo(
    () => ({ user, initializing }),
    [user, initializing],
  );

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}