import { useState, useEffect } from 'react';
import { Socket } from './PhoenixChannels';

const apiUrl = 'http://172.20.10.3:4000';

export default () => {
  const [userId, setUserId] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState({ error: '' });
  const [roomId, setRoomId] = useState('');
  const [gameStarted, changeGameStarted] = useState('');
  const [room, changeRoom] = useState('');


  useEffect(() => {
    if (roomId === '') return;
    const socket = new Socket(`${apiUrl}/socket`, { params: {} });
    socket.connect();
    const channel = socket.channel(`room:${roomId}`, { username: 'dupa' });
    channel.join()
      .receive('ok', ({ user_id }) => {
        changeRoom(channel);
        setUserId(user_id);
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

    return () => {
      channel.leave();
    };
  }, [roomId]);

  const broadcastGameStart = () => {
    room.push('start_game', {}, 10000);
  };

  return [userId, loading, error, setRoomId, gameStarted, broadcastGameStart];
};
