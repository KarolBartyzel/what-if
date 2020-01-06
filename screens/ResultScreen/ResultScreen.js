import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { speak } from 'expo-speech';
import {
  Avatar,
  Button,
  Card,
  List,
  IconButton,
  withTheme,
} from 'react-native-paper';
import {
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

function ResultScreen({
  onClose, results, theme: { colors },
}) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const SPEAK_OPTIONS = {
    language: 'pl',
    onStart: () => setIsSpeaking(true),
    onDone: () => setIsSpeaking(false),
  };
  const speakResults = ({ questionPrefix, question, answer }) => {
    if (!isSpeaking) {
      speak(`${questionPrefix} ${question}? ${answer}.`, SPEAK_OPTIONS);
    }
  };

  return (
    <Card
      style={styles.questionList}
    >
      <Card.Title
        title="Results"
      />
      <ScrollView
        style={styles.list}
      >
        <Card.Content>
          <List.Section>
            {results.map(
              ({
                question_prefix: questionPrefix,
                question,
                question_author_avatar: questionAuthorAvatar,
                answer,
                answer_author_avatar: answerAuthorAvatar,
              }) => (
                <Card key={`${questionPrefix} ${question}`} style={styles.questionCard}>
                  <Card.Title
                    title={`${questionPrefix} ${question}`}
                    subtitle={answer}
                    left={() => (
                      <View>
                        <Avatar.Image size={28} source={{ uri: `data:image/png;base64,${questionAuthorAvatar}` }} style={styles.resultFirstImage} />
                        <Avatar.Image size={28} source={{ uri: `data:image/png;base64,${answerAuthorAvatar}` }} />
                      </View>
                    )}
                    leftStyle={{ width: 30, margin: 0 }}
                    right={() => (<IconButton icon="volume-up" onPress={() => speakResults({ questionPrefix, question, answer })} color={isSpeaking ? colors.disabled : colors.primary} />)}
                  />
                </Card>
              ),
            )}
          </List.Section>
        </Card.Content>
      </ScrollView>
      <Button
        mode="outlined"
        onPress={onClose}
      >
        Close
      </Button>
    </Card>
  );
}

ResultScreen.propTypes = {
  onClose: PropTypes.func.isRequired,
  results: PropTypes.arrayOf(PropTypes.shape({
    question_prefix: PropTypes.string,
    question: PropTypes.string,
    answer: PropTypes.string,
  })).isRequired,
};
ResultScreen.defaultProps = {};

export default withTheme(ResultScreen);

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  questionCard: {
    marginTop: 4,
    marginBottom: 4,
  },
  questionList: {
    flex: 1,
    marginTop: 24,
  },
  resultFirstImage: {
    marginBottom: 5,
  },
});
