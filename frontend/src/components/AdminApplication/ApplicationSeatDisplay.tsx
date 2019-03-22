import { Input } from 'nav-frontend-skjema';
import React from 'react';
import { IRoom, ISeat } from '../ViewRooms';

interface IProps {
  room?: IRoom;
  seat?: ISeat;
}

const ApplicationSeatDisplay: React.FunctionComponent<IProps> = (props) => {
  const { room, seat } = props;
  if (!(room && seat)) return null;
  return (
    <>
      <Input
        label={'Room'}
        disabled={true}
        value={room.name}
      />
      <Input
        label={'Seat'}
        disabled={true}
        value={seat.id}
      />
    </>
  );
};

export default ApplicationSeatDisplay;
