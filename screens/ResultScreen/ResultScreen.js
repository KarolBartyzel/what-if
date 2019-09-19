import React from 'react';
import PropTypes from 'prop-types';
import {speak} from 'expo-speech';
import {
  Button,
  Card,
  List,
  Text,
  IconButton,
} from 'react-native-paper';
import {
  ScrollView,
  StyleSheet,
} from 'react-native';

const speakResults = ({question_prefix, question, answer}) => {
  speak(`${question_prefix} ${question}? ${answer}.`, {language: 'pl'});
}

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
                  subtitle={result.answer}
                  right={() => <IconButton icon='volume-up' onPress={() => speakResults(result)}/>}
                />
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
