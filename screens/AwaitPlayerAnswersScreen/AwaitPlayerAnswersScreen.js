import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator, Avatar, Card, Chip, ProgressBar, Text } from 'react-native-paper';

import { RoomContext } from '../../api/RoomContext';

export default function AwaitPlayerAnswersScreen({ navigation }) {
  const {
    answersObject,
    userId: currentPlayerUserId,
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

    const answeredUserIndex = answersObject
      .answered_users
      .findIndex((answeredUser) => answeredUser.user_id === user.user_id);
    return {
      ...user,
      answered: answeredUserIndex !== -1,
    };
  });
  const answeredUsersCount = userList.filter(user => user.answered).length;
  const allUsersCount = userList.length;

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
            <ProgressBar
              style={styles.loader}
              progress={answeredUsersCount / allUsersCount}
              indeterminate
            />
            {userList.map((answeredUser) => (
              <Chip
                style={styles.userChip}
                key={answeredUser.user_id}
                selected={answeredUser.answered}
                mode="outlined"
                avatar={<Avatar.Image
                  size={24}
                  source={{ uri: `data:image/png;base64,${answeredUser.avatar}` }} />
                }
              >
                <Text>
                  {answeredUser.name}
                </Text>
                {
                  currentPlayerUserId === answeredUser.user_id
                    ? (<Text>(You)</Text>)
                    : (null)
                }
              </Chip>
            ))}
          </Card.Content>
        </Card>

      </View>
    );
}

AwaitPlayerAnswersScreen.propTypes = {};
AwaitPlayerAnswersScreen.defaultProps = {};

const styles = StyleSheet.create({
  loader: {
    marginTop: 4,
    marginBottom: 4,
  },
  userChip: {
    marginTop: 4,
    marginBottom: 4,
    padding: 8,
  },
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
