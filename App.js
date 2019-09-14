import React from 'react';
import {
  Platform, StatusBar, StyleSheet, View,
} from 'react-native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import AppNavigator from './navigation/AppNavigator';
import useRoom from './api/useRoom';
import { RoomContext } from './api/RoomContext';


const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#ffffff',
  },
};

export default function App(props) {
  const [userId, loading, error, answersObject, setRoomId, gameStarted, broadcastGameStart, sendQuestionsAnswers, questionsPrefixes, roomName] = useRoom();

  return (
    <RoomContext.Provider value={{
      userId,
      loading,
      error,
      answersObject,
      setRoomId,
      gameStarted,
      broadcastGameStart,
      questionsPrefixes,
      roomName,
      sendQuestionsAnswers,
    }}
    >
      <PaperProvider theme={theme}>
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <AppNavigator />
        </View>
      </PaperProvider>
    </RoomContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
