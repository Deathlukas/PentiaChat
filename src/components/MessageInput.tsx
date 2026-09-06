import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { colors } from '../theme/colors';

type Props = {
  onSend: (text: string) => void;
};

export function MessageInput({ onSend }: Props) { // Generer et inputfelt til at skrive beskeder og en send-knap. Når brugeren trykker på send, kaldes onSend med den indtastede tekst.
  const [text, setText] = useState('');

  const submit = () => { 
    const trimmed = text.trim();
    if (!trimmed) {
      return;
    }
    onSend(trimmed);
    setText('');
  };

  return ( 
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={text}
        onChangeText={setText}
        placeholder="Skriv en besked…"
        placeholderTextColor={colors.textMuted}
        multiline
        returnKeyType="send"
        blurOnSubmit={false}
        onSubmitEditing={submit}
      />
      <Pressable
        style={[styles.button, !text.trim() && styles.buttonDisabled]}
        onPress={submit}
        disabled={!text.trim()}
      >
        <Text style={styles.buttonText}>Send</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: 8,
    gap: 8,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.background,
  },
  input: {
    flex: 1,
    maxHeight: 120,
    minHeight: 40,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#F1F1F4',
    borderRadius: 20,
    fontSize: 15,
    color: colors.text,
  },
  button: {
    height: 40,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: colors.brand,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonDisabled: { opacity: 0.4 },
  buttonText: { color: colors.brandText, fontWeight: '700' },
});