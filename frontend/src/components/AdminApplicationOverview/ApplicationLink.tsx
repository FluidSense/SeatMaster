import { LenkepanelBase } from 'nav-frontend-lenkepanel';
import { Element } from 'nav-frontend-typografi';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { IApplication } from '../Application';
import { ISeat } from '../Seats';
import { IRoom } from '../ViewRooms';
import { ROUTE_TO } from './constants';
import {
  _LINK_APP_STATUS,
  _LINK_MASTER_STATUS,
  _LINK_NAME_FULLNAME,
  _LINK_ROOM_STATUS,
  _LINK_SEAT_STATUS,
  _LINK_USERNAME_TITLE,
} from './strings';

interface IProps {
  application: IApplication;
  rooms: IRoom[];
}

const getRoomNameFromId = (rooms: IRoom[], seat: ISeat) => {
  const room = rooms.find(x => (x.id === seat.roomId));
  if (room) return room.name;
  return '';
};

const ApplicationLink: React.FunctionComponent<IProps> = (props) => {
  const { application, rooms } = props;
  const user = application.user;
  if (!user || !application) return null;
  const status = application.status;
  const { seat } = application;
  const roomName = seat ? getRoomNameFromId(rooms, seat) : '';
  const seatName = seat ? seat.name : '';
  const link = (panelProps: any) => (
    <NavLink
      to={{ pathname: panelProps.href, application: { ...application }, rooms: [...rooms] }}
      className="lenkepanel lenkepanel--border"
    >
      {panelProps.children}
    </NavLink>);
  return (
    <LenkepanelBase
      key={application.id}
      linkCreator={link}
      href={`${ROUTE_TO}${application.id}`}
    >
      <div className="lenkepanel-applications">
        <div className="link-name"><Element>{_LINK_USERNAME_TITLE}</Element>{user.username}</div>
        <div className="link-full-name">
          <Element>{_LINK_NAME_FULLNAME}</Element>
          {user.fullname}
        </div>
        <div className="link-master">
          <Element>{_LINK_MASTER_STATUS}</Element>
          {application.rank}
        </div>
        <div className="link-status"><Element>{_LINK_APP_STATUS}</Element>{status}</div>
        <div className="link-room"><Element>{_LINK_ROOM_STATUS}</Element>{roomName}</div>
        <div className="link-seat"><Element>{_LINK_SEAT_STATUS}</Element>{seatName}</div>
      </div>
    </LenkepanelBase>
  );
};

export default ApplicationLink;
