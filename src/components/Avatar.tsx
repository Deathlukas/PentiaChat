import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';

type Props = {
  name: string;
  photoUrl: string | null;
  size?: number;
};

export function Avatar({ name, photoUrl, size = 36 }: Props) { // Generere et billede eller initialer baseret på brugerens navn og foto-URL kan ikke ses på egen bruger kun andres.
  const dimension = { width: size, height: size, borderRadius: size / 2 };
  if (photoUrl) {
    return <Image source={{ uri: photoUrl }} style={[styles.image, dimension]} />;
  }
  const initial = name.trim().charAt(0).toUpperCase() || '?';
  return (
    <View style={[styles.fallback, dimension]}>
      <Text style={styles.initial}>{initial}</Text>
    </View>
  );
}

const styles = StyleSheet.create({ 
  image: { backgroundColor: colors.border },
  fallback: { backgroundColor: colors.brand, alignItems: 'center', justifyContent: 'center' },
  initial: { color: colors.brandText, fontWeight: '700' },
});