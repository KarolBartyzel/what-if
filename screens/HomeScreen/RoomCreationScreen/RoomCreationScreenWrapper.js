import React, { useState } from 'react';
import PropTypes from 'prop-types';

import APIHelper from '../../../api/ApiHelper';

import RoomCreationScreen from './RoomCreationScreen';

export default function RoomCreationScreenWrapper({ setRoomUuid }) {
  const [errorMessage, setErrorMessage] = useState(null);

  const onCreateRoom = (room) => {
    const { roomName, questions } = room;

    return APIHelper.createRoom(roomName, questions)
      .then((roomId) => {
        setErrorMessage(null);
        return setRoomUuid(roomId);
      })
      .catch(() => {
        setErrorMessage('An error occurred. Please try again later.');
      });
  };

  return (
    <RoomCreationScreen
      errorMessage={errorMessage}
      onCreateRoom={onCreateRoom}
    />
  );
}

RoomCreationScreenWrapper.propTypes = {
  setRoomUuid: PropTypes.func.isRequired,
};
RoomCreationScreenWrapper.defaultProps = {};

RoomCreationScreenWrapper.navigationOptions = {
  title: 'Create room',
};
