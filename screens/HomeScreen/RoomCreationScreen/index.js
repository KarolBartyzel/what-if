import React, { useState, useContext } from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
} from 'react-native';

import {
  Button,
  Card,
  IconButton,
  Subheading,
  TextInput,
  HelperText,
} from 'react-native-paper';

import { getInitialQuestionObject, getQuestionArray } from './questionOptionsUtils';

import generateRoomName from './roomNames';
import QuestionOptions from './QuestionOptions';
import ApiHelper from '../../../api/ApiHelper';
import RoomContext from '../../../api/RoomContext';

const { width } = Dimensions.get('window');

export default function RoomCreationScreen(props) {
  const [roomName, setRoomName] = useState(generateRoomName());
  const [isTouched, setIsTouched] = React.useState(false);
  const [questionObject, setQuestionObject] = useState(getInitialQuestionObject());

  const {
    setRoomId,
  } = useContext(RoomContext);

  const onQuestionOptionPress = (questionOption) => () => setQuestionObject({
    ...questionObject,
    [questionOption]: !questionObject[questionOption],
  });

  const onCreateRoom = () => {
    ApiHelper.createRoom(roomName, getQuestionArray(questionObject))
      .then((uuid) => {
        setRoomId(uuid);
        props.setRoomUuid(uuid);
      });
  };

  return (
    <>
      <Card.Content style={styles.container}>
        <Subheading>
          General
        </Subheading>
        <View style={styles.roomNameContainer}>
          <TextInput
            label="Room name"
            onChangeText={(text) => setRoomName(text)}
            disabled
            mode="outlined"
            value={roomName}
            error={isTouched && !roomName}
            onBlur={() => {
              setIsTouched(true);
            }}
            style={styles.roomNameInput}
          />
          <IconButton
            icon="autorenew"
            onPress={() => setRoomName(generateRoomName())}
            style={styles.roomNameButton}
          />
        </View>
        <HelperText
          type="error"
          visible={isTouched && !roomName}
        >
          Room name is required
        </HelperText>

        <Subheading>
          Questions
        </Subheading>

        <QuestionOptions
          onQuestionOptionPress={onQuestionOptionPress}
          questionObject={questionObject}
        />
        <HelperText
          type="error"
          visible={!getQuestionArray(questionObject).length}
        >
          At least one question has to be picked
        </HelperText>
      </Card.Content>
      <Card.Actions style={styles.actions}>
        <Button
          onPress={onCreateRoom}
          mode="contained"
          style={styles.createGameButton}
          contentStyle={styles.createGameButtonContent}
          disabled={!roomName.length || !getQuestionArray(questionObject).length}
        >
          Create
        </Button>
      </Card.Actions>
    </>
  );
}

RoomCreationScreen.propTypes = {};
RoomCreationScreen.defaultProps = {};

const styles = StyleSheet.create({
  container: {
    width,
    flex: 1,
  },
  actions: {
    position: 'absolute',
    bottom: 0,
    zIndex: 10,
    width,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  createGameButton: {
    width: 200,
  },
  createGameButtonContent: {
    padding: 5,
  },
  roomNameButton: {
    width: '15%',
  },
  roomNameContainer: {
    alignItems: 'center',
    width: '100%',
    flexDirection: 'row',
  },
  roomNameInput: {
    width: '85%',
  },
});
