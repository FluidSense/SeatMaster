import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { Knapp } from 'nav-frontend-knapper';
import React from 'react';
import { ISeat } from './index';
import Seat from './Seat';
import { _SEATS_EXPAND } from './strings';

interface IProps {
  seats: ISeat[];
  createSeatClick: (seats: ISeat[], roomId: number) => void;
  roomId: number;
}

const Presentational: React.FunctionComponent<IProps> = (props) => {
  const { seats, createSeatClick, roomId } = props;

  const seatElements = seats.map(seat => (
    <Seat id={seat.id} key={seat.id} />
  ));

  const createSeatButton = () => {
    createSeatClick(seats, roomId);
  };

  return (
    <Ekspanderbartpanel tittel={_SEATS_EXPAND} border={true}>
      {seatElements}
      <Knapp onClick={createSeatButton}>Add seat</Knapp>
    </Ekspanderbartpanel>
  );
};

export default Presentational;
