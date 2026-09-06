export interface AppUser { // Interface for en bruger, der indeholder uid, displayName og photoURL.
    uid: string;
    displayName: string | null;
    photoURL: string | null;
  }