import React, { useContext } from 'react';
import { NavigationActions, StackActions } from 'react-navigation';

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
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'Home' })],
    });

    navigation.dispatch(resetAction); 
    
    resetState();
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
