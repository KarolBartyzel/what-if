import React from 'react';
import {
  View,
} from 'react-native';

import { TextInput } from 'react-native-paper';


export default function HomeScreen({
  questionPrefix, question, answer, setAnswer, setQuestion,
}) {
  return (
    <View>
      <TextInput
        label={`${questionPrefix}...`}
        value={question}
        mode="outlined"
        autoCapitalize="none"
        onChangeText={(text) => {
          if (text.length === 0) setAnswer('');
          setQuestion(text);
        }}
      />

      <TextInput
        label={`${questionPrefix} ${question}`}
        value={answer}
        mode="outlined"
        onChangeText={setAnswer}
        disabled={question.length === 0}
        multiline
      />
    </View>
  );
}
