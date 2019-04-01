import React from 'react';
import { ISeat } from '../Seats';
import { IRoom } from '../ViewRooms';
import './applicationaccepted.css';

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
          <span style={{ fontWeight: 'bolder' }}>Room:</span> {room.name}
        </p>
        <p>
          <span style={{ fontWeight: 'bold' }}>Room info:</span> {room.info}
        </p>
      </div>
      <div id="given-seat">
        <p>
          <span style={{ fontWeight: 'bolder' }}>Seat:</span> {seat.id}
        </p>
        <p>
          <span style={{ fontWeight: 'bold' }}>Seat info:</span> {seat.info}
        </p>
      </div>
    </div>
  );
};

export default SeatDisplay;
