import KnappBase from 'nav-frontend-knapper';
import { Checkbox } from 'nav-frontend-skjema';
import { Sidetittel } from 'nav-frontend-typografi';
import React, { ChangeEvent } from 'react';
import { IUser } from '../../API/interfaces';
import { TitleAndSpinner } from '../LoadingPageSpinner/TitleAndSpinner';
import SearchBar from '../SearchBar';
import { FETCHING_STUDENTS } from './constants';
import { _CHECK_ALL_CHECKBOXES, _DELETE_STUDENTS, _VIEW_STUDENTS_TITLE } from './strings';
import UserLink from './UserLink';

interface IProps {
  deleteStudent: (students: number[]) => void;
  deleteStudents: () => void;
  disableButton: boolean;
  fetching: string;
  filterStudents: (event: ChangeEvent<HTMLInputElement>) => void;
  userToBeDeleted: (id: number) => void;
  users: IUser[];
  filteredStudents: IUser[];
  usersToBeDeleted: number[];
  checkAll: (all: boolean) => void;
}

const emptyStudentTitle = (filterFunction: (event: ChangeEvent<HTMLInputElement>) => void) => (
  <div className="main-content">
    <div className="title-and-button">
      <div className="title-and-search-bar">
        <Sidetittel>{_VIEW_STUDENTS_TITLE}</Sidetittel>
        <SearchBar filterFunction={filterFunction}/>
      </div>
    </div>
  </div>);

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
        <div className="title-and-search-bar">
          <Sidetittel>{_VIEW_STUDENTS_TITLE}</Sidetittel>
          <SearchBar filterFunction={filterStudents} disabled={checkedAll}/>
        </div>
        <KnappBase id="delete-students" type="fare" disabled={disableButton} onClick={onClick}>
          {_DELETE_STUDENTS}
        </KnappBase>
      </div>
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
