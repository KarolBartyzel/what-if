
const apiUrl = 'http://192.168.1.30:4000/api/rooms';

export default {

  createRoom: (roomName, questions) => {
    data = {room_name: roomName, questions: questions}

    return fetch(apiUrl,
      {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(data)})
      .then((response) => response.json().then((resp) => Promise.resolve(resp.room_id)))
      .catch((error) => Promise.reject(error));
  }

}