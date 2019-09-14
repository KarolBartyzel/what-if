import React, { useContext } from 'react';
import { Dimensions, StyleSheet, View, Image  } from 'react-native';
import { Text } from 'react-native-paper';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';
import PropTypes from 'prop-types';
import {RoomContext} from "../../api/RoomContext";

const { width } = Dimensions.get('window');

export default function JoinExistingGame(props) {
  const [hasCameraPermission, setHasCameraPermission] = React.useState(null);
  const [isScanned, setIsScanned] = React.useState(false);

  async function askForCameraPermission() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    setHasCameraPermission(status === 'granted');
  }

  const {
    setRoomId,
  } = useContext(RoomContext);

  React.useEffect(() => {
    askForCameraPermission();
  }, []);

  function handleBarCodeScanned({ type, data: roomUuid }) {
    setIsScanned(true);
    setRoomId(roomUuid)
    props.navigate('QuestionsAndAnswers', { roomUuid });
  }

  return (
    <View style={styles.joinExistingGame}>
      {hasCameraPermission === null && (
      <Text>Requesting for camera permission</Text>
      )}
      {hasCameraPermission === false && (
      <Text>No access to camera</Text>
      )}
      {hasCameraPermission === true && (
      <BarCodeScanner
        onBarCodeScanned={isScanned ? undefined : handleBarCodeScanned}
        style={[StyleSheet.absoluteFill, styles.joinExistingGame]}
      >
        <View style={styles.barCodeScannerContainer}>
          <View style={styles.barCodeScannerOpacity}/>
          <View style={styles.barCodeScannerNoOpacity} />
          <View style={styles.barCodeScannerOpacity}/>
        </View>
      </BarCodeScanner>
      )}
      </View>
  );
}

JoinExistingGame.propTypes = {
  navigate: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  joinExistingGame: {
    width,
    height: '100%',
  },
  barCodeScannerContainer: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'stretch',
    flexDirection: 'column'
  },
  barCodeScannerOpacity: {
    backgroundColor: 'rgba(0, 0, 0, .6)',
    flex: 1,
  },
  barCodeScannerNoOpacity: {
    height: width,
  },
});
