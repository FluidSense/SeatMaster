import React from 'react';
import { NavLink } from 'react-router-dom';
import { MailTypes } from '.';
import { IUser } from '../../API/interfaces';
import { IRoom } from '../ViewRooms';

interface IProps {
  recipient: IUser | IUser[] | IRoom;
  mailType: MailTypes;
  className?: string;
}

const MailLink: React.FunctionComponent<IProps> = (props) => {
  const { recipient, mailType, className } = props;
  return (
    <NavLink
      className={`knapp knapp-hoved ${className ? className : ''}`}
      to={{ mailType, pathname: '/mail', recipient: { ...recipient } }}
    >
      Send Mail
    </NavLink>
  );
};

export default MailLink;
