import { LenkepanelBase } from 'nav-frontend-lenkepanel';
import { Element } from 'nav-frontend-typografi';
import React from 'react';
import { IRoom } from './index';
import { _LINK_NAME_TITLE, _LINK_NOTES_TITLE, _LINK_SEATS_TITLE } from './strings';

interface IProps {
  room: IRoom;
}

const RoomLink: React.FunctionComponent<IProps> = (props) => {
  const { room } = props;
  const seats = room.seat !== undefined ? room.seat : 0;
  return (
    <LenkepanelBase key={room.id} href={`/admin/rooms/update-room-${room.id}`}>
      <div className="room-link">
        <div className="link-name"><Element>{_LINK_NAME_TITLE}</Element>{room.name}</div>
        <div className="link-notes"><Element>{_LINK_NOTES_TITLE}</Element>{room.info}</div>
        <div className="link-seats"><Element>{_LINK_SEATS_TITLE}</Element>{seats}</div>
      </div>
    </LenkepanelBase>
  );
};

export default RoomLink;
