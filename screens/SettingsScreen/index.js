import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import RoomContext from '../../api/RoomContext';

export default function SettingsScreen({ navigation }) {
  const {
    setRoomId,
  } = React.useContext(RoomContext);

  return (
    <View style={styles.startGameScreen}>
      <Text>Settings</Text>
    </View>
  );
}

SettingsScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  startGameScreen: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
  }
});
