import KnappBase from 'nav-frontend-knapper';
import { Checkbox } from 'nav-frontend-skjema';
import { Sidetittel } from 'nav-frontend-typografi';
import React from 'react';
import { IUser } from '../../API/interfaces';
import { TitleAndSpinner } from '../LoadingPageSpinner/TitleAndSpinner';
import SearchBar, { searchBarEvent } from '../SearchBar';
import { FETCHING_STUDENTS } from './constants';
import { _CHECK_ALL_CHECKBOXES, _DELETE_STUDENTS, _VIEW_STUDENTS_TITLE } from './strings';
import UserLink from './UserLink';

interface IProps {
  deleteStudent: (students: number[]) => void;
  deleteStudents: () => void;
  disableButton: boolean;
  fetching: string;
  filterStudents: (event: searchBarEvent) => void;
  userToBeDeleted: (id: number) => void;
  users: IUser[];
  filteredStudents: IUser[];
  usersToBeDeleted: number[];
  checkAll: (all: boolean) => void;
}

const Presentational: React.FunctionComponent<IProps> = (props) => {
  let checkbox = null;
  const {
    users,
    deleteStudent,
    deleteStudents,
    disableButton,
    fetching,
    userToBeDeleted,
    usersToBeDeleted,
    checkAll,
    filterStudents,
    filteredStudents,
  } = props;
  if (fetching === FETCHING_STUDENTS) return <TitleAndSpinner title={_VIEW_STUDENTS_TITLE}/>;

  const addAllUsers = (event: React.ChangeEvent<HTMLInputElement>) => {
    checkAll(!event.target.checked);
  };

  const deleteSeveralStudents = () => {
    deleteStudent(usersToBeDeleted);
  };

  const checkedAll = users.length === usersToBeDeleted.length;
  if (users.length === filteredStudents.length) {
    checkbox = (
      <Checkbox checked={checkedAll} onChange={addAllUsers} label={_CHECK_ALL_CHECKBOXES} />
    );
  }

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
      <SearchBar filterFunction={filterStudents} disabled={checkedAll}/>
      {checkbox}
    </>
  );

  const usersList = filteredStudents.map((user) => {
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
