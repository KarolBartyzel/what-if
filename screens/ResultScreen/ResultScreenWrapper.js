import React from 'react';
import PropTypes from 'prop-types';

import ResultScreen from './ResultScreen';

export default function ResultScreenWrapper(props) {
  const { results } = props;

  const onClose = () => console.log('Close results');

  return (
    <ResultScreen
      onClose={onClose}
      results={results}
    />
  );
}

ResultScreenWrapper.propTypes = {
  results: PropTypes.arrayOf(PropTypes.shape({
    question: PropTypes.string,
    answer: PropTypes.string,
  })),
};
ResultScreenWrapper.defaultProps = {
  results: [],
};
