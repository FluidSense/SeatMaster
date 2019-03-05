import { Select } from 'nav-frontend-skjema';
import React from 'react';
import { ISeat } from '../ViewRooms';

interface IProps {
  seats?: ISeat[];
  setSelected: (e: React.FormEvent) => void;
}

const SeatPicker: React.FunctionComponent<IProps> = (props) => {
  const { seats, setSelected } = props;
  const defaultOption = <option key={0} label="">Velg sete</option>;

  if (seats) {
    const options = seats.map((seat: ISeat) => {
      return <option key={seat.id} label={seat.id}>{seat.id}</option>;
    });
    options.unshift(defaultOption);
    return (
      <Select label={'Sete'} bredde="m" onChange={setSelected}>
        {options}
      </Select>
    );
  }
  else {
    return (
      <Select label={'Sete'} bredde="m" disabled={true}>
        {defaultOption}
      </Select>
    );
  }
};

export default SeatPicker;
