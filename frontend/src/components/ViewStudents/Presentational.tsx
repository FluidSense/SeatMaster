import KnappBase from 'nav-frontend-knapper';
import { Checkbox } from 'nav-frontend-skjema';
import { Sidetittel } from 'nav-frontend-typografi';
import React from 'react';
import { IUser } from '../../API/interfaces';
import { TitleAndSpinner } from '../LoadingPageSpinner/TitleAndSpinner';
import Modal from '../Modal';
import SearchBar, { searchBarEvent } from '../SearchBar';
import { FETCHING_STUDENTS } from './constants';
import {
  _CHECK_ALL_CHECKBOXES,
  _DELETE_STUDENTS,
  _DELETING_STUDENTS_WARNING,
  _VIEW_STUDENTS_TITLE,
} from './strings';
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

interface IState {
  modalOpen: boolean;
}

export class Presentational extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      modalOpen: false,
    };
  }

  public addAllUsers = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.props.checkAll(!event.target.checked);
  }

  public deleteSeveralStudents = () => {
    this.props.deleteStudent(this.props.usersToBeDeleted);
  }

  public onClick = () => {
    this.props.users.length === this.props.userToBeDeleted.length ?
      this.props.deleteStudent(this.props.usersToBeDeleted) :
      this.deleteSeveralStudents();
    this.toggleModal();
  }

  public render () {
    let checkbox = null;

    const checkedAll = this.props.users.length === this.props.usersToBeDeleted.length;

    if (this.props.fetching === FETCHING_STUDENTS) {
      return <TitleAndSpinner title={_VIEW_STUDENTS_TITLE}/>;
    }

    if (this.props.users.length === this.props.filteredStudents.length) {
      checkbox = (
        <Checkbox checked={checkedAll} onChange={this.addAllUsers} label={_CHECK_ALL_CHECKBOXES} />
      );
    }

    const usersList = this.props.filteredStudents.map((user) => {
      const checked = this.props.usersToBeDeleted.includes(user.id);
      return (
        <UserLink
          checked={checked}
          addUser={this.props.userToBeDeleted}
          key={user.id}
          user={user}
        />);
    });

    const deletePromptList = this.props.usersToBeDeleted.map((id, i) => {
      const user = this.props.users.find(iteruser => iteruser.id === id);
      if (user) return <li key={i}>{user.username}</li>;
    });

    const modalText = (
      <>
        <p>{_DELETING_STUDENTS_WARNING}</p>
        <ul>
          {deletePromptList}
        </ul>
      </>
    );

    return(
      <div className="main-content">
        <>
          <div className="title-and-button">
            <Sidetittel>{_VIEW_STUDENTS_TITLE}</Sidetittel>
            <KnappBase
              id="delete-students"
              type="fare"
              disabled={this.props.disableButton}
              onClick={this.toggleModal}
            >
              {_DELETE_STUDENTS}
            </KnappBase>
            <Modal
              modalOpen={this.state.modalOpen}
              toggleModal={this.toggleModal}
              accept={this.onClick}
              close={this.toggleModal}
            >
              {modalText}
            </Modal>
          </div>
          <SearchBar filterFunction={this.props.filterStudents} disabled={checkedAll}/>
          {checkbox}
        </>
        {usersList}
    </div>
    );
  }
  private toggleModal = () => {
    const { modalOpen } = this.state;
    this.setState({ modalOpen: !modalOpen });
  }
}

export default Presentational;
