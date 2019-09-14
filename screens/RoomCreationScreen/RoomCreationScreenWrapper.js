import React from 'react';

import RoomCreationScreen from './RoomCreationScreen';

export default function RoomCreationScreenWrapper() {
  const onCreateRoom = (room) => console.log(room);
  const onCancel = () => console.log('cancel');

  return (
    <RoomCreationScreen
      onCancel={onCancel}
      onCreateRoom={onCreateRoom}
    />
  );
}

RoomCreationScreenWrapper.propTypes = {};
RoomCreationScreenWrapper.defaultProps = {};

RoomCreationScreenWrapper.navigationOptions = {
  title: 'Create room',
};
