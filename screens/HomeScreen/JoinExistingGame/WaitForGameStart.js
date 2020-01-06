import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ActivityIndicator, Headline } from 'react-native-paper';

export default function WaitForGameStart() {
  return (
    <View style={styles.waitForGameStart}>
      <Headline>Wait for room owner to start...</Headline>
      <ActivityIndicator />
    </View>
  );
}

const styles = StyleSheet.create({
  waitForGameStart: {
    justifyContent: 'center',
    flex: 1,
  },
});
