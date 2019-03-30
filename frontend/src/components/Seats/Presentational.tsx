import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { Knapp } from 'nav-frontend-knapper';
import React from 'react';
import { ISeat } from '../ViewRooms';
import Seat from './Seat';
import './seats.css';
import { _SEATS_EXPAND } from './strings';

interface IProps {
  deleteSeat: (id: number) => void;
  seats: ISeat[];
  createSeat: () => void;
  roomId: number;
  updateSeat: (seatId: number, newName: string) => void;
}

const Presentational: React.FunctionComponent<IProps> = (props) => {
  const { seats, createSeat, deleteSeat, updateSeat } = props;
  const seatElements = seats.map(seat => (
    <Seat
      id={seat.id}
      name={seat.name}
      user={seat.user}
      key={seat.id}
      deleteSelf={deleteSeat}
      updateSelf={updateSeat}
    />
  ));

  return (
    <div className="mainPanel">
      <Ekspanderbartpanel tittel={_SEATS_EXPAND} border={true}>
        {seatElements}
        <Knapp onClick={createSeat}>Add seat</Knapp>
      </Ekspanderbartpanel>
    </div>

  );
};

export default Presentational;
