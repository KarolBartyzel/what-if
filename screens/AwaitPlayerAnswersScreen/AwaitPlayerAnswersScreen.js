import React, { useContext } from 'react';

import { StyleSheet, View } from 'react-native';

import { ActivityIndicator, Card, Text } from 'react-native-paper';

import { RoomContext } from '../../api/RoomContext';

export default function AwaitPlayerAnswersScreen({ navigation }) {
  const {
    answersObject,
    users,
  } = useContext(RoomContext);

  const allUsersAnswered = answersObject.answered_users === 'all_answered';

  if (allUsersAnswered) {
    navigation.navigate('Results');
  }

  const userList = users.map((user) => {
    if (allUsersAnswered) {
      return {
        ...user,
        answered: true,
      };
    }

    const answeredUserIndex = answersObject.answered_users.findIndex((answeredUser) => answeredUser.user_id === user.user_id);
    return {
      ...user,
      answered: answeredUserIndex !== -1,
    };
  });

  return allUsersAnswered
    ? (
      <View
        style={styles.userList}
      >
        <Card>
          <Card.Content
            style={styles.userListContent}
          >
            <ActivityIndicator
              animating
            />
          </Card.Content>
        </Card>
      </View>
    )
    : (
      <View
        style={styles.userList}
      >
        <Card>
          <Card.Content
            style={styles.userListContent}
          >
            <Card.Title
              title="Awaiting users..."
            />
            <ActivityIndicator
              animating
            />
            {userList.map((answeredUser) => (
              <Card
                key={answeredUser.user_id}
              >
                <Card.Title
                  title={answeredUser.name}
                />
                <Card.Content>
                  <Text
                    style={answeredUser.answered ? styles.answeredUser : styles.unansweredUser}
                  >
                    {answeredUser.answered
                      ? ('Answered')
                      : ('Unanswered')
                    }
                  </Text>
                </Card.Content>
              </Card>
            ))}
          </Card.Content>
        </Card>

      </View>
    );
}

AwaitPlayerAnswersScreen.propTypes = {};
AwaitPlayerAnswersScreen.defaultProps = {};

const styles = StyleSheet.create({
  userList: {
    flex: 1,
    marginTop: 24,
  },
  userListContent: {
    justifyContent: 'center',
  },
  answeredUser: {
    color: 'green',
  },
  unansweredUser: {
    color: 'red',
  },
});
