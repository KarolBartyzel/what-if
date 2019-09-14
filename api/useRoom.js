import { useState, useEffect } from 'react';
import { Socket } from './PhoenixChannels';

const apiUrl = 'http://172.20.10.3:4000';

export default () => {
  const [userId, setUserId] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState({ error: '' });
  const [roomId, setRoomId] = useState('');


  useEffect(() => {
    if(roomId === '') return;
    const socket = new Socket(`${apiUrl}/socket`, { params: {} });
    socket.connect();
    const channel = socket.channel(`room:${roomId}`, { username: 'dupa' });
    channel.join()
      .receive('ok', ({ user_id }) => {
        console.log('XDD')
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

    return () => {
      channel.leave();
    };
  }, [roomId]);

  return [userId, loading, error, setRoomId];
};
