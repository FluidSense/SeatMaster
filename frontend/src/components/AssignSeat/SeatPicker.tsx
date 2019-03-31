import { Select } from 'nav-frontend-skjema';
import React from 'react';
import { ISeat } from '../Seats';

interface IProps {
  seats?: ISeat[];
  setSelected: (e: React.FormEvent) => void;
}

const SeatPicker: React.FunctionComponent<IProps> = (props) => {
  const { seats, setSelected } = props;
  const defaultOption = <option key={0} label="">Velg sete</option>;

  if (seats) {
    const options = seats.map((seat: ISeat) => {
      return <option key={seat.id} label={seat.name}>{seat.id}</option>;
    });
    options.unshift(defaultOption);
    return (
      <Select label={'Sete'} bredde="m" onChange={setSelected}>
        {options}
      </Select>
    );
  }
  return (
    <Select label={'Sete'} bredde="m" disabled={true}>
      {defaultOption}
    </Select>
  );

};

export default SeatPicker;
