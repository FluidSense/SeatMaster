import { LenkepanelBase } from 'nav-frontend-lenkepanel';
import { Element } from 'nav-frontend-typografi';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { IRoom } from './index';
import { _LINK_NAME_TITLE, _LINK_NOTES_TITLE } from './strings';

interface IProps {
  room: IRoom;
}

const RoomLink: React.FunctionComponent<IProps> = (props) => {
  const { room } = props;
  const link = (panelProps: any) => (
    <NavLink
      to={{ pathname: '/admin/rooms/update-room', room: { ...room } }}
      className="lenkepanel lenkepanel--border"
    >
      {panelProps.children}
    </NavLink>);
  return (
    <LenkepanelBase
      key={room.id}
      linkCreator={link}
      href={'/admin/rooms/update-room'}
    >
      <div className="link-name">
        <Element>{_LINK_NAME_TITLE}</Element>
        {room.name}
      </div>
      <div className="link-notes">
        <Element>{_LINK_NOTES_TITLE}</Element>
        {room.info}
      </div>
    </LenkepanelBase>
  );
};

export default RoomLink;
