import React, { useContext } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { Button, Card } from 'react-native-paper';
import QRCode from 'react-native-qrcode-svg';
import PropTypes from 'prop-types';

import RoomCreationScreen from './RoomCreationScreen';
import { RoomContext } from '../../api/RoomContext';
import { SafeAreaView } from 'react-navigation';
const { width } = Dimensions.get('window');

export default function CreateNewGame(props) {
  const [roomUuid, setRoomUuid] = React.useState(null);

  const {
    broadcastGameStart,
  } = useContext(RoomContext);

  function handleStartGame() {
    broadcastGameStart();
    props.navigate('QuestionsAndAnswers');
  }

  return (
    <SafeAreaView>
      {!roomUuid && (
        <RoomCreationScreen setRoomUuid={setRoomUuid} />
      )}
      <Card.Content style={styles.createNewGame}>
        {roomUuid && (
        <QRCode
          value={roomUuid}
          size={width - 10}
        />
        )}
      </Card.Content>
      <Card.Actions style={styles.actions}>
        {roomUuid && (
        <Button
          style={styles.startGameButton}
          contentStyle={styles.startGameButtonContent}
          mode="contained"
          onPress={handleStartGame}
        >
          Start Game
        </Button>
        )}
      </Card.Actions>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  createNewGame: {
    marginTop: 20,
    width,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  startGameButton: {
    width: 200,
  },
  startGameButtonContent: {
    padding: 5,
  },
  actions: {
    width,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
});

CreateNewGame.propTypes = {
  navigate: PropTypes.func.isRequired,
};
