import React, {useContext} from 'react';
import PropTypes from 'prop-types';

import { View } from 'react-native';

import { ActivityIndicator, Text } from 'react-native-paper';

import { RoomContext } from '../../api/RoomContext';

export default function AwaitPlayerAnswersScreen({}) {
  const {
    answersObject,
  } = useContext(RoomContext);

  const allUsersAnswered = answersObject.answered_users === 'all_answered';

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
          {answersObject.answered_users.map((answeredUser) => (
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
