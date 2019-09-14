import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';

import JoinExistingGame from './JoinExistingGame';
import CreateNewGame from './CreateNewGame';

export default function StartGameScreen(props) {
  const [isNewGame, setIsNewGame] = React.useState(true);

  function handleJoinExistingGame() {
    setIsNewGame(false);
    // setIsJoinExistingGameOpen(true);
  }

  function handleCreateNewGame() {
    setIsNewGame(true);
  }

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
  },
  tabSwitch: {
    flexDirection: 'row',
    marginTop: 50
  },
  tabContent: {
    width: '100%',
    alignItems: 'center',
  },
});
