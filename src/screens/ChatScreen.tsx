import React from 'react';
import {ActivityIndicator,FlatList,KeyboardAvoidingView,Platform,StyleSheet,Text,View,} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';
import { useAuth } from '../context/Auth';
import { useMessages } from '../hooks/useMessage';
import { MessageBubble } from '../components/MessageBubble';
import { MessageInput } from '../components/MessageInput';
import { colors } from '../theme/colors';

type Props = NativeStackScreenProps<RootStackParamList, 'Chat'>;

export function ChatScreen({ route }: Props) { // Generer en chat-skærm, der viser beskederne i et chatrum og giver brugeren mulighed for at sende nye beskeder.
  const { roomId } = route.params;
  const { user } = useAuth();
  const { messages, loading, loadingOlder, error, send, loadOlder } = useMessages(roomId, user);
  const insets = useSafeAreaInsets();

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {error && <Text style={styles.error}>{error}</Text>}
      {loading ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <FlatList
          data={messages}
          inverted
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <MessageBubble message={item} isOwn={item.senderId === user?.uid} />
          )}
          contentContainerStyle={styles.list}
          onEndReached={loadOlder}
          onEndReachedThreshold={0.3}
          ListFooterComponent={
            loadingOlder ? <ActivityIndicator size="small" /> : undefined
          }
        />
      )}
      <MessageInput onSend={send} />
      <View style={{ height: insets.bottom }} />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  centered: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  list: { paddingVertical: 8 },
  error: { color: colors.error, padding: 8, textAlign: 'center' },
  footer: { paddingVertical: 12 },
});