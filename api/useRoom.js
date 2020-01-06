import { useState, useEffect } from 'react';
import { Socket } from './PhoenixChannels';
import { SERVER_URL } from '../dotenv';

import { adjectives, getRandomInt, usernameNouns } from '../constants/Names';

function generateUsername() {
  return `${adjectives[getRandomInt(0, adjectives.length)]} ${usernameNouns[getRandomInt(0, usernameNouns.length)]}`;
}

export default () => {
  const [userId, setUserId] = useState('');
  const [userPhoto, setUserPhoto] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState({ error: '' });
  const [roomId, setRoomId] = useState('');
  const [gameStarted, changeGameStarted] = useState('');
  const [room, changeRoom] = useState(null);
  const [questionsPrefixes, setQuestionsPrefixes] = useState('');
  const [roomName, seRoomName] = useState('');
  const [answersObject, setAnswersObject] = useState({ answered_users: [], answers: null });
  const [username, setUsername] = useState(generateUsername());
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (roomId === '') return () => {};
    const socket = new Socket(`${SERVER_URL}/socket`, { params: {} });
    socket.connect();
    const channel = socket.channel(`room:${roomId}`, { username, avatar: userPhoto });
    channel.join()
      .receive('ok', ({ user_id: newUserId, questions_prefixes: newQuestionPrefixes, room_name: newRoomName }) => {
        console.log(newUserId, newQuestionPrefixes, newRoomName);
        changeRoom(channel);
        setUserId(newUserId);
        setQuestionsPrefixes(newQuestionPrefixes);
        seRoomName(newRoomName);
        setLoading(false);
      })
      .receive('error', ({ reason }) => {
        channel.leave();
        setError({ error: reason });
      })
      .receive('timeout', ({ reason }) => {
        channel.leave();
        setError({ error: reason });
      });

    channel.on('game_started', () => changeGameStarted(true));

    channel.on('answers_update', (newAnswersObject) => {
      setAnswersObject(newAnswersObject);
    });

    channel.on('users_update', ({ users: newUsers }) => {
      setUsers(newUsers);
    });

    return () => {
      channel.leave();
    };
  }, [roomId]);

  const broadcastGameStart = () => {
    if (room) room.push('start_game', {}, 10000);
  };

  const sendQuestionsAnswers = (questionsAnswersByPrefix) => {
    const questionsAnswers = Object.keys(questionsAnswersByPrefix)
      .reduce(
        (accumulator, nextPrefix) => {
          const questionAnswer = {
            question_prefix: nextPrefix,
            question: questionsAnswersByPrefix[nextPrefix].question,
            answer: questionsAnswersByPrefix[nextPrefix].answer,
          };
          accumulator.push(questionAnswer);
          return accumulator;
        },
        [],
      );

    room.push('submit', questionsAnswers, 10000);
  };


  const resetState = () => {
    setUserId('');
    setLoading(true);
    setError('');
    setRoomId('');
    changeGameStarted('');
    changeRoom(null);
    setQuestionsPrefixes('');
    seRoomName('');
    setAnswersObject({ answered_users: [], answers: null });
    setUsername(generateUsername());
    setUsers([]);
  };

  return [
    userId,
    loading,
    error,
    answersObject,
    setRoomId,
    gameStarted,
    broadcastGameStart,
    sendQuestionsAnswers,
    questionsPrefixes,
    roomName,
    username,
    setUsername,
    users,
    resetState,
    userPhoto,
    setUserPhoto,
  ];
};
