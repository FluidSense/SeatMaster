import { LenkepanelBase } from 'nav-frontend-lenkepanel';
import { Element } from 'nav-frontend-typografi';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { ROUTE_TO } from './constants';
import { IRoom } from './index';
import { _LINK_NAME_TITLE, _LINK_NOTES_TITLE, _LINK_SEATS_TITLE } from './strings';

interface IProps {
  room: IRoom;
}

const RoomLink: React.FunctionComponent<IProps> = (props) => {
  const { room } = props;
  const seats = room.seats.count !== undefined ? room.seats.count : 0;
  const link = (panelProps: any) => (
    <NavLink
      to={{ pathname: panelProps.href, room: { ...room } }}
      className="lenkepanel lenkepanel--border"
    >
      {panelProps.children}
    </NavLink>);
  return (
    <LenkepanelBase
      key={room.id}
      linkCreator={link}
      href={`${ROUTE_TO}${room.id}`}
    >
      <div className="lenkepanel-rooms">
        <div className="link-name"><Element>{_LINK_NAME_TITLE}</Element>{room.name}</div>
        <div className="link-notes"><Element>{_LINK_NOTES_TITLE}</Element>{room.info}</div>
        <div className="link-seats"><Element>{_LINK_SEATS_TITLE}</Element>{seats}</div>
      </div>
    </LenkepanelBase>
  );
};

export default RoomLink;
