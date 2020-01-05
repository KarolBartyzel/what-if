import React, { useState } from 'react';
import {
  Platform, StatusBar, StyleSheet, View,
} from 'react-native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
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
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  const [
    userId,
    loading,
    error,
    answersObject,
    setRoomId,
    gameStarted,
    broadcastGameStart,
    sendQuestionsAnswers,
    questionsPrefixes,
    roomName,
    username,
    setUsername,
    users,
    resetState,
  ] = useRoom();

  return !isLoadingComplete
    ? (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={(error) => console.warn(error)}
        onFinish={() => handleFinishLoading(setLoadingComplete)}
      />
    )
    : (
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
        username,
        setUsername,
        users,
        resetState,
      }}
      >
        <PaperProvider theme={theme}>
          <View style={styles.container}>
            {Platform.OS === 'ios' && <StatusBar barStyle="default"/>}
            <AppNavigator/>
          </View>
        </PaperProvider>
      </RoomContext.Provider>
    );
}

async function loadResourcesAsync() {
  await Promise.all([
    Asset.loadAsync([
      require('./assets/images/ag.png'),
      require('./assets/images/bc.png'),
      require('./assets/images/be.png'),
      require('./assets/images/dt.png'),
      require('./assets/images/dw.png'),
      require('./assets/images/fd.png'),
      require('./assets/images/hc.png'),
      require('./assets/images/rm.png'),
      require('./assets/images/vp.png'),
    ]),
  ]);
}

function handleFinishLoading(setLoadingComplete) {
  setLoadingComplete(true);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
