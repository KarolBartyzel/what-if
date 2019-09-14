import { useState, useEffect } from 'react';
import { Socket } from './PhoenixChannels';

const apiUrl = 'http://172.20.10.3:4000';

export default (roomId, username) => {
  const [userId, setUserId] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState({ error: '' });


  useEffect(() => {
    const socket = new Socket(`${apiUrl}/socket`, { params: {} });
    socket.connect();
    const channel = socket.channel(`room:${roomId}`, { username });
    channel.join()
      .receive('ok', ({ user_id }) => {
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
  }, [roomId, username]);

  return [userId, loading, error];
};
