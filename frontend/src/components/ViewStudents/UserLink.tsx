import { Panel } from 'nav-frontend-paneler';
import { Checkbox } from 'nav-frontend-skjema';
import { Element } from 'nav-frontend-typografi';
import React from 'react';
import { IUser } from '../../API/interfaces';
import { _CHECK_CHECKBOX, _USER_FULL_NAME, _USER_USERNAME } from './strings';

interface IProps {
  user: IUser;
  addUser: (id: number) => void;
  checked: boolean;
}

const UserLink: React.FunctionComponent<IProps> = (props) => {
  const { user, addUser, checked } = props;
  const checkDelete = () => addUser(user.id);
  return (
    <div className={'user-component'}>
      <Checkbox
        checked={checked}
        onChange={checkDelete}
        className="user-delete-checkbox"
        label={_CHECK_CHECKBOX}
      />
      <Panel border={true} id="panel-users" >
        <div className="users-panel">
          <div className="user-name">
          <Element>{_USER_FULL_NAME}</Element>{user.fullname}
          </div>
          <div className="user-username">
            <Element>{_USER_USERNAME}</Element>{user.username}
          </div>
        </div>
      </Panel>
    </div>
  );
};

export default UserLink;
