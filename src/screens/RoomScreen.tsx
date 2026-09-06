import React, { useLayoutEffect } from 'react';
import {ActivityIndicator,FlatList,Pressable,RefreshControl,StyleSheet,Text,View,} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';
import { useRooms } from '../hooks/useRooms';
import { RoomListItem } from '../components/RoomListItem';
import { signOut } from '../service/firebase/authService';
import { colors } from '../theme/colors';

type Props = NativeStackScreenProps<RootStackParamList, 'Rooms'>;

export function RoomScreen({ navigation }: Props) { // Generer en skærm, der viser en liste over chatrum. Brugeren kan trykke på et rum for at navigere til chat-skærmen.
  const { rooms, loading, refreshing, error, refresh } = useRooms();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable onPress={() => signOut()}>
          <Text style={styles.logout}>Log ud</Text>
        </Pressable>
      ),
    });
  }, [navigation]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {error && <Text style={styles.error}>{error}</Text>}
      <FlatList
        data={rooms}
        keyExtractor={room => room.id}
        renderItem={({ item }) => (
          <RoomListItem
            room={item}
            onPress={() =>
              navigation.navigate('Chat', {
                roomId: item.id,
                roomName: item.name,
              })
            }
          />
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={refresh} />
        }
        ListEmptyComponent={<Text style={styles.empty}>Ingen rum endnu</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  centered: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  separator: { height: 1, backgroundColor: colors.border, marginLeft: 16 },
  error: { color: colors.error, padding: 16 },
  empty: { textAlign: 'center', color: colors.textMuted, marginTop: 40 },
  logout: { color: colors.brandText, fontWeight: '600', paddingHorizontal: 8 },
});