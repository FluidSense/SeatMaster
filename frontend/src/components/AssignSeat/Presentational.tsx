import React from 'react';
import { IRoom } from '../ViewRooms';
import RoomPicker from './RoomPicker';
import SeatPicker from './SeatPicker';

interface IProps {
  rooms: IRoom[];
}

const Presentational: React.FunctionComponent<IProps> = (props) => {
  const { rooms } = props;

  return (
    <>
      <RoomPicker rooms={rooms} />
      <SeatPicker seats={[]} />
    </>
  );
};

export default Presentational;
