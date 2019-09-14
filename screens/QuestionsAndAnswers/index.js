import React, { useState, useContext } from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';

import { Button, ProgressBar } from 'react-native-paper';
import QuestionAnswerForm from './QuestionAnswerForm';
import { RoomContext } from '../../api/RoomContext';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    flex: 1,
    justifyContent: 'space-between',
  },
  inputs: {
    marginTop: '35%',
  },
  button: {
    marginTop: 40,
  },
});

export default function ({ navigation }) {
  const [currentQuestionPrefixIndex, setCurrentQuestionPrefixIndex] = useState(0);
  const [userAnswers, setUserAnswears] = useState({});
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const {
    questionsPrefixes,
    sendQuestionsAnswers,
  } = React.useContext(RoomContext);

  const currentQuestionPrefix = questionsPrefixes[currentQuestionPrefixIndex];

  const handleQuestion = () => {
    if (Object.keys(userAnswers).length === questionsPrefixes.length) return;
    setUserAnswears({
      ...userAnswers,
      [currentQuestionPrefix]: {
        question,
        answer,
      },
    });
    setCurrentQuestionPrefixIndex(Math.min(currentQuestionPrefixIndex + 1, questionsPrefixes.length - 1));
    setQuestion('');
    setAnswer('');
  };

  const submit = () => {
    if (question.length * answer.length === 0) return;
    const userAnswers = ({
      ...userAnswers,
      [currentQuestionPrefix]: {
        question,
        answer,
      },
    });

    setCurrentQuestionPrefixIndex(Math.min(currentQuestionPrefixIndex + 1, questionsPrefixes.length - 1));
    setQuestion('');
    setAnswer('');

    sendQuestionsAnswers(userAnswers);
    navigation.navigate('AwaitPlayerAnswers');
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputs}>
        <QuestionAnswerForm
          questionPrefix={currentQuestionPrefix}
          question={question}
          answer={answer}
          setAnswer={setAnswer}
          setQuestion={setQuestion}
        />

        {
          currentQuestionPrefixIndex === questionsPrefixes.length - 1
            ? (
              <Button
                mode="contained"
                style={styles.button}
                disabled={question.length * answer.length === 0}
                onPress={submit}
              >
                Submit Answers
              </Button>
            )
            : (
              <Button
                mode="contained"
                style={styles.button}
                onPress={handleQuestion}
                disabled={question.length * answer.length === 0}
              >
              Next question
              </Button>
            )
        }
      </View>
      <ProgressBar
        progress={(currentQuestionPrefixIndex + 1) / questionsPrefixes.length}
        indeterminate
      />
    </View>
  );
}
