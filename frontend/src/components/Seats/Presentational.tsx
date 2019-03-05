import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import { Knapp } from 'nav-frontend-knapper';
import React from 'react';
import { ISeat } from './index';
import Seat from './Seat';
import { _SEATS_EXPAND } from './strings';

interface IProps {
  seats: ISeat[];
}

const Presentational: React.FunctionComponent<IProps> = (props) => {
  const { seats } = props;

  const seatElements = seats.map(seat => (
    <Seat id={seat.id} key={seat.id} />
  ));

  return (
    <Ekspanderbartpanel tittel={_SEATS_EXPAND} border={true}>
      {seatElements}
      <Knapp>Add seat</Knapp>
    </Ekspanderbartpanel>
  );
};

export default Presentational;
