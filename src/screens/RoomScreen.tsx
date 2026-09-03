import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export function RoomScreen() {
  return (
    <View style={styles.container}>
      <Text>Rooms</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});