import { LenkepanelBase } from 'nav-frontend-lenkepanel';
import { Checkbox } from 'nav-frontend-skjema';
import { Element } from 'nav-frontend-typografi';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { IUser } from '../../API/interfaces';
import { _USER_FULL_NAME, _USER_USERNAME } from './strings';

interface IProps {
  user: IUser;
  addUser: (id: number) => void;
  checked: boolean;
}

const ROUTE_TO = 'user';

const UserLink: React.FunctionComponent<IProps> = (props) => {
  const { user, addUser, checked } = props;
  const checkDelete = () => addUser(user.id);
  const link = (panelProps: any) => (
    <NavLink
      to={{ pathname: panelProps.href, user: { ...user } }}
      className="lenkepanel lenkepanel--border"
    >
      {panelProps.children}
    </NavLink>);
  return (
    <div className={'user-component'}>
      <Checkbox
        checked={checked}
        onChange={checkDelete}
        className="user-delete-checkbox"
        label={'Delete'}
      />
      <LenkepanelBase
        key={user.id}
        linkCreator={link}
        href={ROUTE_TO}
      >
        <div className="user-link">
          <div className="link-name"><Element>{_USER_FULL_NAME}</Element>{'full name'}</div>
          <div className="link-username"><Element>{_USER_USERNAME}</Element>{user.username}</div>
        </div>
      </LenkepanelBase>
    </div>
  );
};

export default UserLink;
