import React, { useState } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';

import {
  Button,
  Card,
  Subheading,
  Text,
  TextInput,
} from 'react-native-paper';

import { getInitialQuestionObject, getQuestionArray } from './questionOptionsUtils';

import QuestionOptions from './QuestionOptions';

export default function RoomCreationScreen(props) {
  const [roomName, setRoomName] = useState('');
  const [questionObject, setQuestionObject] = useState(getInitialQuestionObject());

  const onQuestionOptionPress = (questionOption) => () => setQuestionObject({
    ...questionObject,
    [questionOption]: !questionObject[questionOption],
  });

  const onCreateRoom = (room) => {
    props.setRoomUuid('lala');
  };

  return (
    <View style={styles.container}>
          <Subheading>
            General
          </Subheading>
          <TextInput
            label="Room name"
            onChangeText={(text) => setRoomName(text)}
            value={roomName}
          />
          <Subheading>
            Questions
          </Subheading>
          <QuestionOptions
            onQuestionOptionPress={onQuestionOptionPress}
            questionObject={questionObject}
          />
        <Card.Actions>
          <Button
            onPress={() => onCreateRoom({
              roomName,
              questions: getQuestionArray(questionObject),
            })}
            mode="contained"
          >
              Create
          </Button>

        </Card.Actions>
    </View>
  );
}

RoomCreationScreen.propTypes = {};
RoomCreationScreen.defaultProps = {};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 8,
    width: '100%',
  },
  card: {
    width: '100%',
  },
});
