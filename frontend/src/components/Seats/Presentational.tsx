import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { Knapp } from 'nav-frontend-knapper';
import React from 'react';
import { ISeat } from './index';
import Seat from './Seat';
import { _SEATS_EXPAND } from './strings';

interface IProps {
  deleteSeat: (id: string) => void;
  seats: ISeat[];
  createSeat: () => void;
  roomId: number;
}

const Presentational: React.FunctionComponent<IProps> = (props) => {
  const { seats, createSeat, deleteSeat } = props;

  const seatElements = seats.map(seat => (
    <Seat id={seat.id} key={seat.id} deleteSelf={deleteSeat} />
  ));

  return (
    <Ekspanderbartpanel tittel={_SEATS_EXPAND} border={true}>
      {seatElements}
      <Knapp onClick={createSeat}>Add seat</Knapp>
    </Ekspanderbartpanel>
  );
};

export default Presentational;
