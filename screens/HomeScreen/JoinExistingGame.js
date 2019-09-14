import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';
import PropTypes from 'prop-types';

export default function JoinExistingGame(props) {
	const [hasCameraPermission, setHasCameraPermission] = React.useState(null);
	const [isScanned, setIsScanned] = React.useState(false);

	async function askForCameraPermission() {
		const { status } = await Permissions.askAsync(Permissions.CAMERA);
		setHasCameraPermission(status === 'granted');
	}

	React.useEffect(() => {
		askForCameraPermission();
	}, []);

	function handleBarCodeScanned ({ type, data: roomUuid }) {
		setIsScanned(true);
		// props.navigate('QuestionsAndAnswers', { roomUuid });
		props.navigate('Links', { roomUuid });
	};

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
					style={StyleSheet.absoluteFillObject}
				/>
			)}
		</View>
	)
}

JoinExistingGame.propTypes = {
    navigate: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
	joinExistingGame: {
		display: 'flex',
		height: 300,
		width: 300,
		margin: 20
	},
});
