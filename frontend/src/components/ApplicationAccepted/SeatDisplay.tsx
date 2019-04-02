import React from 'react';
import { ISeat } from '../Seats';
import { IRoom } from '../ViewRooms';
import './applicationaccepted.css';
import { _ROOM_INFO, _ROOM_NAME, _SEAT_NAME } from './strings';

interface IProps {
  seat: ISeat;
  room: IRoom;
}

const SeatDisplay: React.FunctionComponent<IProps> = (props) => {
  const { seat, room } = props;

  return (
    <div id="accepted-app-info">
      <div id="given-room">
        <p>
          <span style={{ fontWeight: 'bolder' }}>{_ROOM_NAME}</span> {room.name}
        </p>
        <p>
          <span style={{ fontWeight: 'bold' }}>{_ROOM_INFO}</span> {room.info}
        </p>
      </div>
      <div id="given-seat">
        <p>
          <span style={{ fontWeight: 'bolder' }}>{_SEAT_NAME}</span> {seat.name}
        </p>
      </div>
    </div>
  );
};

export default SeatDisplay;
