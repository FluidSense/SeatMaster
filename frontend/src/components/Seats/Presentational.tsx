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
  updateSeat: (oldId: string, newId: string) => void;
}

const Presentational: React.FunctionComponent<IProps> = (props) => {
  const { seats, createSeat, deleteSeat, updateSeat } = props;

  const seatElements = seats.map(seat => (
    <Seat id={seat.id} key={seat.id} deleteSelf={deleteSeat} updateSelf={updateSeat} />
  ));

  return (
    <Ekspanderbartpanel tittel={_SEATS_EXPAND} border={true}>
      {seatElements}
      <Knapp onClick={createSeat}>Add seat</Knapp>
    </Ekspanderbartpanel>
  );
};

export default Presentational;