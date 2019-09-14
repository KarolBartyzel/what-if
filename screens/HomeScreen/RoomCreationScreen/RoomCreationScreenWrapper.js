import React from 'react';

import RoomCreationScreen from './RoomCreationScreen';

export default function RoomCreationScreenWrapper(props) {
  const onCreateRoom = (room) => {
    props.setRoomUuid('lala');
  };

  return (
    <RoomCreationScreen
      onCreateRoom={onCreateRoom}
    />
  );
}

RoomCreationScreenWrapper.propTypes = {};
RoomCreationScreenWrapper.defaultProps = {};

RoomCreationScreenWrapper.navigationOptions = {
  title: 'Create room',
};
