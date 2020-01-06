import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { Button, Card } from 'react-native-paper';
import i18n from 'i18n-js';

import JoinExistingGame from './JoinExistingGame';
import CreateNewGame from './CreateNewGame';
import RoomContext from '../../api/RoomContext';

export default function StartGameScreen({ navigation }) {
  const [isNewGame, setIsNewGame] = React.useState(true);
  const {
    setRoomId,
  } = React.useContext(RoomContext);

  function handleJoinExistingGame() {
    setRoomId('');
    setIsNewGame(false);
  }

  function handleCreateNewGame() {
    setRoomId('');
    setIsNewGame(true);
  }

  return (
    <View style={styles.startGameScreen}>
      <View style={styles.tabSwitch}>
        <Button
          mode={isNewGame ? 'text' : 'contained'}
          onPress={handleJoinExistingGame}
        >
          {i18n.t('Join Existing Room')}
        </Button>
        <Button
          mode={isNewGame ? 'contained' : 'text'}
          onPress={handleCreateNewGame}
        >
          {i18n.t('Create New Room')}
        </Button>
      </View>
      <Card style={styles.tabContent}>
        {isNewGame && (
        <CreateNewGame navigate={navigation.navigate} />
        )}
        {!isNewGame && (
        <JoinExistingGame navigate={navigation.navigate} />
        )}
      </Card>
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
    marginTop: 50,
  },
  tabContent: {
    width: Dimensions.get('window').width,
    alignItems: 'center',
    flex: 1,
  },
});
