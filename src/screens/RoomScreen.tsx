import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { signOut } from '../service/firebase/authService';

export function RoomScreen() {
  return (
    <View style={styles.container}>
      <Text>Rooms</Text>
      <Pressable onPress={() => signOut()} style={styles.button}>
        <Text style={styles.buttonText}>Log ud</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 16 },
  button: { padding: 12 },
  buttonText: { color: '#0B5FFF', fontWeight: '600' },
});