import { Select } from 'nav-frontend-skjema';
import React from 'react';
import { IRoom } from '../ViewRooms';

interface IProps {
  rooms: IRoom[];
  setSelected: (e: React.FormEvent) => void;
}

const RoomPicker: React.FunctionComponent<IProps> = (props) => {
  const { rooms, setSelected } = props;
  const options = rooms.map((room: IRoom) => {
    return <option key={room.id} value={room.id}>{room.name}</option>;
  });
  options.unshift(<option key={0} value={0}>Velg et rom</option>);
  return (
    <Select label={'Room'} bredde="m" onChange={setSelected}>
      {options}
    </Select>
  );
};

export default RoomPicker;
