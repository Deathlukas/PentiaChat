import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../theme/colors';

export function LoginScreen() {
  const onGoogle = () => {
    // kobles på i næste trin
  };
  const onFacebook = () => {
    // kobles på i næste trin
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>PentiaChat</Text>
          <Text style={styles.subtitle}>Log ind for at fortsætte</Text>
        </View>

        <View style={styles.buttons}>
          <Pressable
            style={({ pressed }) => [
              styles.button,
              styles.googleButton,
              pressed && styles.pressed,
            ]}
            onPress={onGoogle}
          >
            <Text style={[styles.buttonText, { color: colors.googleText }]}>
              Fortsæt med Google
            </Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              styles.button,
              styles.facebookButton,
              pressed && styles.pressed,
            ]}
            onPress={onFacebook}
          >
            <Text style={[styles.buttonText, { color: colors.facebookText }]}>
              Fortsæt med Facebook
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.splashBackground },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'space-between',
    paddingVertical: 48,
  },
  header: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 34, fontWeight: '700', color: colors.splashText },
  subtitle: { fontSize: 16, color: colors.splashText, marginTop: 8 },
  buttons: { gap: 12 },
  button: {
    height: 52,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  googleButton: {
    backgroundColor: colors.google,
    borderWidth: 1,
    borderColor: colors.border,
  },
  facebookButton: { backgroundColor: colors.facebook },
  buttonText: { fontSize: 16, fontWeight: '600' },
  pressed: { opacity: 0.7 },
});