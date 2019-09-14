import React, { useState } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import PropTypes from 'prop-types';

import {
  Button,
  Card,
  Subheading,
  Text,
  TextInput,
} from 'react-native-paper';

import { getInitialQuestionObject, getQuestionArray } from './questionOptionsUtils';

import QuestionOptions from './QuestionOptions';

export default function RoomCreationScreen({ errorMessage, onCreateRoom }) {
  const [roomName, setRoomName] = useState('');
  const [questionObject, setQuestionObject] = useState(getInitialQuestionObject());

  const onQuestionOptionPress = (questionOption) => () => setQuestionObject({
    ...questionObject,
    [questionOption]: !questionObject[questionOption],
  });

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Title
          title={<Text>Room settings</Text>}
        />
        <Card.Content>
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
          {errorMessage
            ? (
              <Text>
                {errorMessage}
              </Text>
            )
            : null}
        </Card.Content>
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
      </Card>
    </View>
  );
}

RoomCreationScreen.propTypes = {
  errorMessage: PropTypes.string,
  onCreateRoom: PropTypes.func.isRequired,
};
RoomCreationScreen.defaultProps = {
  errorMessage: null,
};

RoomCreationScreen.navigationOptions = {
  title: 'Create room',
};

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
