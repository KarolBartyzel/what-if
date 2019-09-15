import React from 'react';
import PropTypes from 'prop-types';

import {
  Button,
  Card,
  List,
  Text,
} from 'react-native-paper';
import {
  ScrollView,
  StyleSheet,
} from 'react-native';

export default function ResultScreen({ onClose, results }) {
  return (
    <Card
      style={styles.questionList}
    >
      <Card.Title
        title="Results"
      />
      <ScrollView
        style={styles.list}
      >
        <Card.Content>
          <List.Section>
            {results.map((result) => (
              <Card
                key={`${result.question_prefix} ${result.question}`}
                style={styles.questionCard}
              >
                <Card.Title
                  title={`${result.question_prefix} ${result.question}`}
                />
                <Card.Content>
                  <Text>
                    {result.answer}
                  </Text>
                </Card.Content>
              </Card>
            ))}
          </List.Section>
        </Card.Content>
      </ScrollView>
      <Button
        mode="outlined"
        onPress={onClose}
      >
        Close
      </Button>
    </Card>
  );
}

ResultScreen.propTypes = {
  onClose: PropTypes.func.isRequired,
  results: PropTypes.arrayOf(PropTypes.shape({
    question_prefix: PropTypes.string,
    question: PropTypes.string,
    answer: PropTypes.string,
  })).isRequired,
};
ResultScreen.defaultProps = {};

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  questionCard: {
    marginTop: 4,
    marginBottom: 4,
  },
  questionList: {
    flex: 1,
    marginTop: 24,
  }
});
