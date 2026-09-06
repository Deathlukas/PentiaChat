import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Avatar } from './Avatar';
import { colors } from '../theme/colors';
import { formatMessageDate } from '../utils/date';
import type { Message } from '../models/messages';

type Props = {
  message: Message;
  isOwn: boolean;
};

export function MessageBubble({ message, isOwn }: Props) { // Generer en bobbel med beskedens tekst, afsenderens navn og tidspunktet for beskeden.
  return (
    <View style={[styles.row, isOwn && styles.rowOwn]}>
      {!isOwn && (
        <Avatar name={message.senderName} photoUrl={message.senderPhotoUrl} />
      )}
      <View style={[styles.bubble, isOwn ? styles.bubbleOwn : styles.bubbleOther]}>
        {!isOwn && <Text style={styles.sender}>{message.senderName}</Text>}
        <Text style={[styles.text, isOwn && styles.textOwn]}>{message.text}</Text>
        <Text style={[styles.date, isOwn && styles.dateOwn]}>
          {formatMessageDate(message.createdAt)}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginVertical: 4,
    marginHorizontal: 12,
    gap: 8,
  },
  rowOwn: { justifyContent: 'flex-end' },
  bubble: { maxWidth: '78%', borderRadius: 16, padding: 10 },
  bubbleOther: { backgroundColor: '#F1F1F4', borderBottomLeftRadius: 4 },
  bubbleOwn: { backgroundColor: colors.brand, borderBottomRightRadius: 4 },
  sender: { fontSize: 12, fontWeight: '700', color: colors.textMuted, marginBottom: 2 },
  text: { fontSize: 15, color: colors.text },
  textOwn: { color: colors.brandText },
  date: { fontSize: 11, color: colors.textMuted, marginTop: 4, alignSelf: 'flex-end' },
  dateOwn: { color: 'rgba(255,255,255,0.8)' },
});