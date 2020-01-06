import React from 'react';
import PropTypes from 'prop-types';

import {
  Chip,
  Text,
} from 'react-native-paper';

import { StyleSheet, View } from 'react-native';
import { questionOptions } from './questionOptionsUtils';

export default function QuestionOptions({
  onQuestionOptionPress,
  questionObject,
}) {
  return (
    <View style={styles.questionOptions}>
      {
        questionOptions.map((questionOption) => (
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
        ))
      }
    </View>
  );
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
