export type RootStackParamList = { // Definerer parametrene for navigationsstacken i appen.
    Login: undefined;
    Rooms: undefined;
    Chat: { roomId: string; roomName: string };
  };