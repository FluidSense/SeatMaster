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
      const seatInputValue =
        seat.user
          ? `${seat.name} - ${seat.user.fullname}`
          : `${seat.name}`;
      return <option key={seat.id} label={seatInputValue}>{seat.id}</option>;
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
