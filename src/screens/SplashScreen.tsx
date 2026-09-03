import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';

export function SplashScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>PentiaChat</Text>
      <ActivityIndicator size="large" color={colors.splashText} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.splashBackground,
  },
  title: {
    fontSize: 40,
    fontWeight: '700',
    color: colors.splashText,
    marginBottom: 24,
  },
});