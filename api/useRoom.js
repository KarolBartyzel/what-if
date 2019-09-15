import { useState, useEffect } from 'react';
import { Socket } from './PhoenixChannels';

const apiUrl = 'https://hidden-hollows-14760.herokuapp.com';

export default () => {
  const [userId, setUserId] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState({ error: '' });
  const [roomId, setRoomId] = useState('');
  const [gameStarted, changeGameStarted] = useState('');
  const [room, changeRoom] = useState('');
  const [questionsPrefixes, setQuestionsPrefixes] = useState('');
  const [roomName, seRoomName] = useState('');
  const [answersObject, setAnswersObject] = useState({ answered_users: [], answers: null });
  const [username, setUsername] = useState('doopzko');

  useEffect(() => {
    if (roomId === '') return;
    const socket = new Socket(`${apiUrl}/socket`, { params: {} });
    socket.connect();
    const channel = socket.channel(`room:${roomId}`, { username });
    channel.join()
      .receive('ok', ({ user_id, questions_prefixes, room_name }) => {
        console.log(user_id, questions_prefixes, room_name )
        changeRoom(channel);
        setUserId(user_id);
        setQuestionsPrefixes(questions_prefixes);
        seRoomName(room_name);
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

    return () => {
      channel.leave();
    };
  }, [roomId]);

  const broadcastGameStart = () => {
    room.push('start_game', {}, 10000);
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

  return [userId, loading, error, answersObject, setRoomId, gameStarted, broadcastGameStart, sendQuestionsAnswers, questionsPrefixes, roomName, username, setUsername];
};
