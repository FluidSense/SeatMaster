import React from 'react';
import { IStateProps as IProps } from './index';
import RoomLink from './RoomLink';

const Presentational: React.FunctionComponent<IProps> = (props) => {
  const { rooms } = props;
  if (!rooms) return null;
  if (!rooms.length) return null;
  const roomList = rooms.map(room => (
    <RoomLink key={room.id} room={room} />
  ));
  return (
    <div className="main-content">
      {roomList}
    </div>
  );
};

export default Presentational;
