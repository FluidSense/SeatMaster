import { Select } from 'nav-frontend-skjema';
import React from 'react';

interface IProps {
  seats: [];
}

interface ITempSeat {
  id: string;
}

const SeatPicker: React.FunctionComponent<IProps> = (props) => {
  const { seats } = props;
  const options = seats.map((seat: ITempSeat) => {
    return <option key={seat.id} label={seat.id}>{seat.id}</option>;
  });

  return (
    <Select label={'Sete'} bredde="m">
      {options}
    </Select>
  );
};

export default SeatPicker;
