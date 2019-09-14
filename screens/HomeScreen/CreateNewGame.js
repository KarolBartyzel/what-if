import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, ActivityIndicator } from 'react-native-paper';
import QRCode from 'react-native-qrcode';
import PropTypes from 'prop-types';

import RoomCreationScreen from './RoomCreationScreen/RoomCreationScreenWrapper';

export default function CreateNewGame(props) {
	const [roomUuid, setRoomUuid] = React.useState(null);

	function handleStartGame() {
		// props.navigate('QuestionsAndAnswers', { roomUuid });
		props.navigate('Links', { roomUuid });
	}

	return (
		<View style={styles.createNewGame}>
			{!roomUuid && (
				<RoomCreationScreen setRoomUuid={setRoomUuid} />
			)}
			{roomUuid && (
				<>
				<QRCode
					value={roomUuid}
					size={300}
				/>
				<Button
					style={styles.startGameButton}
					// icon="new"
					mode="contained"
					onPress={handleStartGame}
				>
					Start Game
				</Button>
				</>
			)}
		</View>
	)
}

const styles = StyleSheet.create({
	createNewGame: {
		marginTop: 20,
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center'
    },
    startGameButton: {
        marginTop: 20
    }
});

CreateNewGame.propTypes = {
    navigate: PropTypes.func.isRequired,
};