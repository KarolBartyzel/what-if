import React from 'react';
import {
  View,
} from 'react-native';

import { TextInput } from 'react-native-paper';


export default function HomeScreen({questionPrefix, question, answear, setAnswear, setQuestion}) {

  return (
    <View>
      <TextInput
        label={`${questionPrefix}...`}
        value={question}
        mode={'outlined'}
        onChangeText={text => {
          if (text.length === 0) setAnswear('');
          setQuestion(text.toLowerCase())
        }}
      />

      <TextInput
        label={`${questionPrefix} ${question}`}
        value={answear}
        mode={'outlined'}
        onChangeText={setAnswear}
        disabled={question.length === 0}
        multiline
      />
    </View>
  );
}
