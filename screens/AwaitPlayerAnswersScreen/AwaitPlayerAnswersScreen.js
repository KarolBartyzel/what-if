import React, {useContext} from 'react';
import PropTypes from 'prop-types';

import { View } from 'react-native';

import { ActivityIndicator, Text } from 'react-native-paper';

import { RoomContext } from '../../api/RoomContext';

export default function AwaitPlayerAnswersScreen({}) {
  const {
    answersObject,
  } = useContext(RoomContext);

  const allUsersAnswered = answersObject.answeredUsers === 'all_answered';

  if (allUsersAnswered) {
    navigation.navigate('Results');
  }

  return allUsersAnswered
    ? (
      <ActivityIndicator
        animating
      />
    )
      : (
        <View>
          <Text>
            Awaiting users...
          </Text>
          {answersObject.answeredUsers.map((answeredUser) => (
            <Text
              key={answeredUser.id}
            >
              {answeredUser.name}
            </Text>
          ))}
        </View>
    );
}

AwaitPlayerAnswersScreen.propTypes = {};
AwaitPlayerAnswersScreen.defaultProps = {};
