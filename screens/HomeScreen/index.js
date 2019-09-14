import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';

import JoinExistingGame from './JoinExistingGame';
import CreateNewGame from './CreateNewGame';
import ApiHelper from "../../api/ApiHelper";

export default function StartGameScreen(props) {
  const [isNewGame, setIsNewGame] = React.useState(true);

  function handleJoinExistingGame() {
    setIsNewGame(false);
    // setIsJoinExistingGameOpen(true);
  }

  function handleCreateNewGame() {
    setIsNewGame(true);
  }

  ApiHelper.createRoom('XD', ['123'])
    .then((id) => {
      ApiHelper.joinRoom(id, '696969')
        .then(({userId, room}) => {
          console.log(userId)
          room.on('users_update', (msg) => console.log('Got message', msg));
        })
        .catch(console.log)
    });

  return (
    <View style={styles.startGameScreen}>
      <View style={styles.tabSwitch}>
        <Button
          mode={isNewGame ? 'text' : 'contained'}
          onPress={handleJoinExistingGame}
        >
					Join Existing Room
        </Button>
        <Button
          mode={isNewGame ? 'contained' : 'text'}
          onPress={handleCreateNewGame}
        >
					Create New Room
        </Button>
      </View>
      <View style={styles.tabContent}>
        {isNewGame && (
        <CreateNewGame navigate={props.navigation.navigate} />
        )}
        {!isNewGame && (
        <JoinExistingGame navigate={props.navigation.navigate} />
        )}
      </View>
    </View>
  );
}

StartGameScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  startGameScreen: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabSwitch: {
    flexDirection: 'row',
  },
  tabContent: {
    height: '50%',
    width: '100%',
  },
});
