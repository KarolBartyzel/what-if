import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { RoomContext } from '../../../api/RoomContext';
import ScanQrCode from './ScanQrCode';
import WaitForGameStart from './WaitForGameStart';

export default function JoinExistingGame(props, context) {
  const [isScanned, setIsScanned] = React.useState(false);
  const { gameStarted } = useContext(RoomContext);

  React.useEffect(() => {
    if (gameStarted) {
      props.navigate('QuestionsAndAnswers');
    }
  }, [gameStarted]);

  if (isScanned) {
    return (
      <WaitForGameStart />
    );
  }

  return (
    <ScanQrCode setIsScanned={setIsScanned} />
  );
}

JoinExistingGame.propTypes = {
  navigate: PropTypes.func.isRequired,
};
