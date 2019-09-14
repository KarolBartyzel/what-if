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

export default function RoomCreationScreen({ onCancel, onCreateRoom }) {
  const [roomName, setRoomName] = useState('');
  const [questionObject, setQuestionObject] = useState(getInitialQuestionObject());

  const onQuestionOptionPress = (questionOption) => () => setQuestionObject({
    ...questionObject,
    [questionOption]: !questionObject[questionOption],
  });

  return (
    <View style={styles.container}>
      <Card>
        <Card.Title
          title={<Text>Room settings</Text>}
        />
        <Card.Content>
          <Subheading>
            General
          </Subheading>
          <TextInput
            label='Room name'
            onChangeText={text => setRoomName(text)}
            value={roomName}
          />
          <Subheading>
            Questions
          </Subheading>
          <QuestionOptions
            onQuestionOptionPress={onQuestionOptionPress}
            questionObject={questionObject}
          />
        </Card.Content>
        <Card.Actions>
          <Button
            onPress={onCancel}
            mode='outlined'
          >
            <Text>
              Cancel
            </Text>
          </Button>
          <Button
            onPress={() => onCreateRoom({
              roomName,
              questions: getQuestionArray(questionObject),
            })}
            mode='contained'
          >
            <Text>
              Create
            </Text>
          </Button>

        </Card.Actions>
      </Card>
    </View>
  );
}

RoomCreationScreen.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onCreateRoom: PropTypes.func.isRequired,
};
RoomCreationScreen.defaultProps = {};

RoomCreationScreen.navigationOptions = {
  title: 'Create room',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 8,
  },
});
