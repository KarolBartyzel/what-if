import React, {useContext} from 'react';
import PropTypes from 'prop-types';

import ResultScreen from './ResultScreen';
import { RoomContext } from '../../api/RoomContext';

export default function ResultScreenWrapper(props) {
  const { navigation } = props;

  const {
    answersObject,
  } = useContext(RoomContext);
  const { answers: results } = answersObject;

  const onClose = () => navigation.navigate('Home');

  return (
    <ResultScreen
      onClose={onClose}
      results={results}
    />
  );
}

ResultScreenWrapper.propTypes = {};
ResultScreenWrapper.defaultProps = {};
