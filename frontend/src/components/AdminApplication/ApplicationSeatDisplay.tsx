import KnappBase from 'nav-frontend-knapper';
import { Input } from 'nav-frontend-skjema';
import { Innholdstittel } from 'nav-frontend-typografi';
import React from 'react';
import { IRoom, ISeat } from '../ViewRooms';
import { _CURRENT_SEAT, _REMOVE_FROM_SEAT } from './strings';

interface IProps {
  room?: IRoom;
  seat?: ISeat;
  removeFromSeat: (roomId: number, seatId: string) => void;
}

const ApplicationSeatDisplay: React.FunctionComponent<IProps> = (props) => {
  const { room, seat, removeFromSeat } = props;
  if (!(room && seat)) return null;
  const onClick = () => removeFromSeat(room.id, seat.id);
  return (
    <div className="application-room">
    <Innholdstittel>{_CURRENT_SEAT}</Innholdstittel>
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
      <KnappBase type="fare" onClick={onClick}>
        {_REMOVE_FROM_SEAT}
      </KnappBase>
    </div>
  );
};

export default ApplicationSeatDisplay;
