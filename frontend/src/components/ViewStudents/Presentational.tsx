import KnappBase from 'nav-frontend-knapper';
import { Checkbox } from 'nav-frontend-skjema';
import { Sidetittel } from 'nav-frontend-typografi';
import React from 'react';
import { IUser } from '../../API/interfaces';
import { TitleAndSpinner } from '../LoadingPageSpinner/TitleAndSpinner';
import { FETCHING_STUDENTS } from './constants';
import { _CHECK_ALL_CHECKBOXES, _DELETE_STUDENTS, _VIEW_STUDENTS_TITLE } from './strings';
import UserLink from './UserLink';

interface IProps {
  deleteStudent: (students: number[]) => void;
  deleteStudents: () => void;
  disableButton: boolean;
  fetching: string;
  userToBeDeleted: (id: number) => void;
  users: IUser[];
  usersToBeDeleted: number[];
  checkAll: (all: boolean) => void;
}

const emptyStudentTitle = (
  <div className="main-content"><Sidetittel>{_VIEW_STUDENTS_TITLE}</Sidetittel></div>);

const Presentational: React.FunctionComponent<IProps> = (props) => {
  const {
    users,
    deleteStudent,
    deleteStudents,
    disableButton,
    fetching,
    userToBeDeleted,
    usersToBeDeleted,
    checkAll,
  } = props;
  if (fetching === FETCHING_STUDENTS) return <TitleAndSpinner title={_VIEW_STUDENTS_TITLE}/>;
  if (!users || !users.length) return emptyStudentTitle;

  const addAllUsers = (event: React.ChangeEvent<HTMLInputElement>) => {
    checkAll(!event.target.checked);
  };

  const deleteSeveralStudents = () => {
    deleteStudent(usersToBeDeleted);
  };

  const checkedAll = users.length === usersToBeDeleted.length;

  const onClick =
    users.length === userToBeDeleted.length ?
      deleteStudents :
      deleteSeveralStudents;

  const studentTitle = (
    <>
      <div className="title-and-button">
        <Sidetittel>{_VIEW_STUDENTS_TITLE}</Sidetittel>
        <KnappBase id="delete-students" type="fare" disabled={disableButton} onClick={onClick}>
          {_DELETE_STUDENTS}
        </KnappBase>
      </div>
      <Checkbox checked={checkedAll} onChange={addAllUsers} label={_CHECK_ALL_CHECKBOXES} />
    </>
  );

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
      {studentTitle}
      {usersList}
    </div>
  );
};

export default Presentational;
