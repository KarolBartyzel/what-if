import React, { useContext } from 'react';
import { StyleSheet, Dimensions, Platform } from 'react-native';
import { Button, Card } from 'react-native-paper';
import QRCodeAndroid from 'react-native-qrcode';
import QRCodeIOS from 'react-native-qrcode-svg';
import PropTypes from 'prop-types';

import { SafeAreaView } from 'react-navigation';
import RoomCreationScreen from './RoomCreationScreen';
import RoomContext from '../../api/RoomContext';

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
      {roomUuid && (
        <>
          <Card.Content style={styles.createNewGame}>
            {Platform.OS === 'ios' && (
            <QRCodeIOS
              value={roomUuid}
              size={width - 10}
            />
            )}
            {Platform.OS === 'android' && (
            <QRCodeAndroid
              value={roomUuid}
              size={width - 10}
            />
            )}
          </Card.Content>
          <Card.Actions style={styles.actions}>
            <Button
              style={styles.startGameButton}
              contentStyle={styles.startGameButtonContent}
              mode="contained"
              onPress={handleStartGame}
            >
              Start Game
            </Button>
          </Card.Actions>
        </>
      )}
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
