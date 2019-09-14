import React, { useState } from 'react';
import {
  View,
  StyleSheet
} from 'react-native';

import QuestionAnswerForm from './QuestionAnswerForm';
import { Button, ProgressBar } from "react-native-paper";

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
  }
});

export default function() {

  const [currentQuestionPrefixIndex, setCurrentQuestionPrefixIndex] = useState(0);
  const [userAnswers, setUserAnswears] = useState({});
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const questions = [
    'What if',
    'Why',
    'How'
  ];

  const currentQuestionPrefix = questions[currentQuestionPrefixIndex];

  const handleQuestion = () => {
    if(Object.keys(userAnswers).length === questions.length) return;
    setUserAnswears({
      ...userAnswers,
      [currentQuestionPrefix]: {
        question,
        answer,
      }
    });
    setCurrentQuestionPrefixIndex(Math.min(currentQuestionPrefixIndex + 1, questions.length - 1));
    setQuestion('');
    setAnswer('');
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
          currentQuestionPrefixIndex === questions.length - 1 ?
            <Button
              mode="contained"
              style={styles.button}
              disabled={question.length * answer.length === 0}
            >
              Submit Answers
            </Button>
            :
            <Button
              mode="contained"
              style={styles.button}
              onPress={handleQuestion}
              disabled={question.length * answer.length === 0}
            >
              Next question
            </Button>
        }
      </View>
      <ProgressBar
        progress={(currentQuestionPrefixIndex + 1)/questions.length}
        indeterminate
      />
    </View>
  );
}
