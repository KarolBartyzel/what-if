import React, { useContext } from 'react';

import ResultScreen from './ResultScreen';
import { RoomContext } from '../../api/RoomContext';

export default function ResultScreenWrapper(props) {
  const { navigation } = props;

  const {
    answersObject,
    resetState,
  } = useContext(RoomContext);
  const { answers: results } = answersObject;

  const onClose = () => {
    resetState();
    navigation.navigate('Home');
  };

  return (
    <ResultScreen
      onClose={onClose}
      results={results}
    />
  );
}

ResultScreenWrapper.propTypes = {};
ResultScreenWrapper.defaultProps = {};
