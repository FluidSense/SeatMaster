import { Panel } from 'nav-frontend-paneler';
import { Checkbox } from 'nav-frontend-skjema';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import React from 'react';
import { IUser } from '../../API/interfaces';
import MailLink from '../Mail/MailLink';
import {
  _CHECKBOX_LABEL,
  _USER_APPLICATION_STATUS,
  _USER_EMAIL,
  _USER_FULL_NAME,
  _USER_USERNAME,
} from './strings';

interface IProps {
  user: IUser;
  addUser: (id: number) => void;
  checked: boolean;
}

const UserPanel: React.FunctionComponent<IProps> = (props) => {
  const { user, addUser, checked } = props;
  const checkDelete = () => addUser(user.id);
  return (
    <div className={'user-component'}>
      <Checkbox
        checked={checked}
        onChange={checkDelete}
        className="user-delete-checkbox"
        label={_CHECKBOX_LABEL}
      />
      <Panel border={true} id="panel-users" >
        <div className="users-panel">
          <div>
            <Element>{_USER_FULL_NAME}</Element>
            <Normaltekst>{user.fullname}</Normaltekst>
          </div>
          <div>
            <Element>{_USER_USERNAME}</Element>
            <Normaltekst>{user.username}</Normaltekst>
          </div>
          <div>
            <Element>{_USER_EMAIL}</Element>
            <Normaltekst>{user.email}</Normaltekst>
          </div>
        <MailLink recipient={user} mailType="DIRECT"/>
        </div>
      </Panel>
    </div>
  );
};

export default UserPanel;
