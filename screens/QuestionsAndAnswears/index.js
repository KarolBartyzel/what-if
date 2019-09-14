import React, { useState } from 'react';
import {
  View,
  StyleSheet
} from 'react-native';

import QuestionAnswearForm from './QuestionAnswearForm';
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
  const [userAnswears, setUserAnswears] = useState({});
  const [question, setQuestion] = useState('');
  const [answear, setAnswear] = useState('');

  const questions = [
    'What if',
    'Why',
    'How'
  ];

  const currentQuestionPrefix = questions[currentQuestionPrefixIndex];

  const handleQuestion = () => {
    if(Object.keys(userAnswears).length === questions.length) return;
    setUserAnswears({
      ...userAnswears,
      [currentQuestionPrefix]: {
        question,
        answear,
      }
    });
    setCurrentQuestionPrefixIndex(Math.min(currentQuestionPrefixIndex + 1, questions.length - 1));
    setQuestion('');
    setAnswear('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputs}>
        <QuestionAnswearForm
          questionPrefix={currentQuestionPrefix}
          question={question}
          answear={answear}
          setAnswear={setAnswear}
          setQuestion={setQuestion}
        />

        {
          currentQuestionPrefixIndex === questions.length - 1 ?
            <Button
              mode="contained"
              style={styles.button}
              disabled={question.length * answear.length === 0}
            >
              Submit Answears
            </Button>
            :
            <Button
              mode="contained"
              style={styles.button}
              onPress={handleQuestion}
              disabled={question.length * answear.length === 0}
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
