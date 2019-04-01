import KnappBase from 'nav-frontend-knapper';
import { Panel } from 'nav-frontend-paneler';
import { Element, Innholdstittel } from 'nav-frontend-typografi';
import React from 'react';
import { ISeat } from '../Seats';
import { IRoom } from '../ViewRooms';
import { _CURRENT_SEAT, _REMOVE_FROM_SEAT } from './strings';

interface IProps {
  room?: IRoom;
  seat?: ISeat;
  removeFromSeat: (seatId: number) => void;
}

const assignedPanel = (label: string, value: string | number) => (
  <div className="current-seat-info">
    <Element>{label}</Element>
    <Panel>{value}</Panel>
  </div>);

const ApplicationSeatDisplay: React.FunctionComponent<IProps> = (props) => {
  const { room, seat, removeFromSeat } = props;
  if (!(room && seat)) return null;
  const seatName = seat.name !== undefined && seat.name !== '' ? seat.name : seat.id;
  const onClick = () => removeFromSeat(seat.id);
  return (
    <div>
      <Innholdstittel>{_CURRENT_SEAT}</Innholdstittel>
      <div id="application-current-seat">
        <div>
          {assignedPanel('Room', room.name)}
          {assignedPanel('Seat', seatName)}
        </div>
        <KnappBase type="fare" onClick={onClick}>
          {_REMOVE_FROM_SEAT}
        </KnappBase>
      </div>
    </div>
  );
};

export default ApplicationSeatDisplay;
