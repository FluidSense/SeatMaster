import React from 'react';
import { IStateProps as IProps } from './index';
import RoomLink from './RoomLink';

const Presentational: React.FunctionComponent<IProps> = (props) => {
  const { rooms } = props;
  const roomList = rooms.map(room => (
    <RoomLink key={room.id} room={room} />
  ));
  return (
    <>
      {roomList}
    </>
  );
};

export default Presentational;
