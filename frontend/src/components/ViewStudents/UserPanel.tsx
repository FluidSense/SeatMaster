import { Panel } from 'nav-frontend-paneler';
import { Checkbox } from 'nav-frontend-skjema';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import React from 'react';
import { IUser } from '../../API/interfaces';
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
          <div className="user-name">
            <Element>{_USER_FULL_NAME}</Element>
            <Normaltekst>{user.fullname}</Normaltekst>
          </div>
          <div className="user-username">
            <Element>{_USER_USERNAME}</Element>
            <Normaltekst>{user.username}</Normaltekst>
          </div>
          <div className="user-email">
            <Element>{_USER_EMAIL}</Element>
            <Normaltekst>{user.email}</Normaltekst>
          </div>
        </div>
      </Panel>
    </div>
  );
};

export default UserPanel;
