import React from 'react';
import { ISeat } from '../ViewRooms';

interface IProps {
  seat: ISeat;
}

const SeatDisplay: React.FunctionComponent<IProps> = (props) => {
  const { seat } = props;

  return (
    <>
    <p>
      <span style={{ fontWeight:'bolder' }}>Room:</span> {seat.roomId}
    </p>
    <p>
      <span style={{ fontWeight: 'bolder' }}>Seat:</span> {seat.id}
    </p>
    <p>
      <span style={{ fontWeight: 'bold' }}>Info:</span> {seat.info}
    </p>
    </>
  );
};

export default SeatDisplay;
