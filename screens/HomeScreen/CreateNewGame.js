import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { Button, ActivityIndicator, Card } from 'react-native-paper';
import QRCode from 'react-native-qrcode';
import PropTypes from 'prop-types';

import RoomCreationScreen from './RoomCreationScreen';

const { width } = Dimensions.get('window');

export default function CreateNewGame(props) {
  const [roomUuid, setRoomUuid] = React.useState(null);

  function handleStartGame() {
    props.navigate('QuestionsAndAnswers', { roomUuid });
  }

  return (
    <>
    <Card.Content style={styles.createNewGame}>
      {!roomUuid && (
        <RoomCreationScreen setRoomUuid={setRoomUuid} />
      )}
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
          mode="contained"
          onPress={handleStartGame}
        >
          Start Game
        </Button>
      )}
    </Card.Actions>
    </>
  );
}

const styles = StyleSheet.create({
  createNewGame: {
    marginTop: 20,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  startGameButton: {
    // marginTop: 20,
    // width: '100%'
  },
  actions: {
    position: 'absolute',
    bottom: 20,
    // width: Dimensions.get('window').width,
    // alignItems: 'center',
    // justifyContent: 'center'
  }
});

CreateNewGame.propTypes = {
  navigate: PropTypes.func.isRequired,
};
