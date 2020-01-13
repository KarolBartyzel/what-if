import React from 'react';
import { StyleSheet, View } from 'react-native';
import { DrawerItems } from 'react-navigation';
import {Avatar} from 'react-native-paper';
export default function CustomDrawer(props) {
  return (
    <View style={styles.startGameScreen}>
      <Avatar.Image size={128} source={require('../assets/images/dt.png')} style={{marginBottom: 20}}/>
      <View>
        <DrawerItems {...props}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  startGameScreen: {
    paddingVertical: 30,
    height: '100%',
    width: '100%',
    alignItems: 'center',
  }
});
