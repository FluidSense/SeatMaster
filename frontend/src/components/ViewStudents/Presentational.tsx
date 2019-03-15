import KnappBase from 'nav-frontend-knapper';
import { Checkbox } from 'nav-frontend-skjema';
import { Sidetittel } from 'nav-frontend-typografi';
import React from 'react';
import { IUser } from '../../API/interfaces';
import { IStateProps } from './index';
import { _DELETE_ALL_STUDENTS, _VIEW_STUDENTS_TITLE } from './strings';
import UserLink from './UserLink';

interface IProps extends IStateProps {
  users: IUser[];
  disableButton: boolean;
  userToBeDeleted: (id: number) => void;
  usersToBeDeleted: number[];
  checkAll: (all: boolean) => void;
}

const Presentational: React.FunctionComponent<IProps> = (props) => {
  const { users, disableButton, userToBeDeleted, usersToBeDeleted, checkAll } = props;
  if (!users) return null;
  if (!users.length) return null;
  const addAllUsers = (event: React.ChangeEvent<HTMLInputElement>) => {
    checkAll(!event.target.checked);
  };
  const checkedAll = users.length === usersToBeDeleted.length;
  const usersList = users.map((user) => {
    const checked = usersToBeDeleted.includes(user.id);
    return (
      <UserLink
        checked={checked}
        addUser={userToBeDeleted}
        key={user.id}
        user={user}
      />);
  });
  return (
    <div className="main-content">
      <div className="title-and-button">
        <Sidetittel>{_VIEW_STUDENTS_TITLE}</Sidetittel>
        <KnappBase id="delete-students" type="fare" disabled={disableButton}>
          {_DELETE_ALL_STUDENTS}
        </KnappBase>
        <Checkbox checked={checkedAll} onChange={addAllUsers} label={'Delete all students'} />
      </div>
      {usersList}
    </div>
  );
};

export default Presentational;
