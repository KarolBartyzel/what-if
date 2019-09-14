import React from 'react';
import PropTypes from 'prop-types';

import {
  Chip,
  Text,
  withTheme,
} from 'react-native-paper';

import { StyleSheet } from 'react-native';
import { questionOptions } from './questionOptionsUtils';

export default function QuestionOptions({
  onQuestionOptionPress,
  questionObject,
}) {
  return questionOptions.map((questionOption) => (
    <Chip
      key={questionOption}
      onPress={onQuestionOptionPress(questionOption)}
      mode="outlined"
      selected={questionObject[questionOption]}
      style={styles.chip}
    >
      <Text>
        {questionOption}
      </Text>
    </Chip>
  ));
}

QuestionOptions.propTypes = {
  questionObject: PropTypes.shape({}).isRequired,
  onQuestionOptionPress: PropTypes.func.isRequired,
};
QuestionOptions.defaultProps = {};

const styles = StyleSheet.create({
  chip: {
    backgroundColor: '#fff',
    marginTop: 4,
    marginBottom: 4,
  },
});
