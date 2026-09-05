import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { ChatRoom } from '../models/chatRooms';
import { colors } from '../theme/colors';

type Props = {
  room: ChatRoom;
  onPress: () => void;
};

export function RoomListItem({ room, onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.row, pressed && styles.pressed]}
    >
      <View style={styles.texts}>
        <Text style={styles.name}>{room.name}</Text>
        <Text style={styles.description} numberOfLines={1}>
          {room.description}
        </Text>
      </View>
      <Text style={styles.chevron}>›</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: colors.background,
  },
  pressed: { backgroundColor: '#F3F4F6' },
  texts: { flex: 1 },
  name: { fontSize: 16, fontWeight: '600', color: colors.text },
  description: { fontSize: 14, color: colors.textMuted, marginTop: 2 },
  chevron: { fontSize: 26, color: colors.textMuted, marginLeft: 8 },
});