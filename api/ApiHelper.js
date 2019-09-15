const apiUrl = 'https://hidden-hollows-14760.herokuapp.com';

export default {

  createRoom: (roomName, questions) => {
    const data = { room_name: roomName, questions };

    return fetch(`${apiUrl}/api/rooms`,
      { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
      .then((response) => response.json())
      .then((resp) => {
        console.log(resp)
        return Promise.resolve(resp.room_id)
      })
      .catch((error) => Promise.reject(error));
  },
};
