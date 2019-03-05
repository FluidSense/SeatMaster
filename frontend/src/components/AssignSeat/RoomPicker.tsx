import { Select } from 'nav-frontend-skjema';
import { IRoom } from '../ViewRooms';

interface IProps {
  rooms: IRoom[];
}

const RoomPicker: React.FunctionComponent<IProps> = (props) => {
  const { rooms } = props;
  const options = rooms.map((room: IRoom) => {
    return <option key={room.id} value={room.id}>{room.name}</option>;
  });
  options.unshift(<option key={0} value="">Velg et rom</option>);
  return (
    <Select label={'Room'} bredde="m">
      {options}
    </Select>
  );
};

export default RoomPicker;
