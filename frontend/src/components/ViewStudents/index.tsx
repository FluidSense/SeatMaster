import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { IUser } from '../../API/interfaces';
import { IStore } from '../../store';
import { lowerIncludes } from '../../utils/searchBarFilter';
import { searchBarEvent } from '../SearchBar';
import {
  deleteAllStudents,
  deleteSingleStudent,
  fetchAllStudents,
} from './actions';
import Presentational from './Presentational';
import './viewStudents.css';

export interface IStateProps {
  students: IUser[];
  fetching: string;
}

interface IDispatchProps {
  fetchStudents: () => void;
  deleteStudent: (id: number) => void;
  deleteStudents: () => void;
}

interface IState {
  filteredUsers: IUser[];
  usersToBeDeleted: number[];
}

type Props = IStateProps & IDispatchProps;

// tslint:disable-next-line:class-name
class _Container extends Component<Props, IState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      filteredUsers: props.students,
      usersToBeDeleted: [],
    };
  }
  public componentDidMount = () => this.props.fetchStudents();

  public componentDidUpdate = (prevProps: Props) => {
    const { students } = this.props;
    if (prevProps.students !== students) {
      this.setState({ filteredUsers: students });
    }
  }

  public render() {
    const { usersToBeDeleted, filteredUsers } = this.state;
    const { deleteStudents, fetching, students } = this.props;
    const disableButton = usersToBeDeleted.length > 0 ? false : true;
    return (
      <Presentational
        filteredStudents={filteredUsers}
        filterStudents={this.filterStudents}
        users={students}
        disableButton={disableButton}
        userToBeDeleted={this.addUserToBeDeleted}
        usersToBeDeleted={usersToBeDeleted}
        checkAll={this.checkAllOrNone}
        deleteStudent={this.deleteSingleStudent}
        deleteStudents={deleteStudents}
        fetching={fetching}
      />);
  }

  private filterStudents = (event: searchBarEvent) => {
    const { students } = this.props;
    const { value } = event.target;
    const filteredUsers = students.filter((user) => {
      if (user) {
        if (lowerIncludes(user.username, value)
        || lowerIncludes(user.email, value)
        || lowerIncludes(user.fullname, value)
        ) return user;
      }
    });
    this.setState({ filteredUsers });
  }

  private checkAllOrNone = (all: boolean) => {
    const { students } = this.props;
    if (all) {
      this.setState({ usersToBeDeleted: [] });
    } else {
      const allUserIds = students.map(student => student.id);
      this.setState({
        filteredUsers: students,
        usersToBeDeleted: allUserIds,
      });
    }
  }

  private addUserToBeDeleted = (id: number) => {
    const { usersToBeDeleted } = this.state;
    if (!usersToBeDeleted.includes(id)) {
      this.setState(state => ({ usersToBeDeleted: [...state.usersToBeDeleted, id] }));
    } else {
      const filteredUsers = usersToBeDeleted.filter(userId => id !== userId);
      this.setState({ usersToBeDeleted: filteredUsers });
    }
  }

  private deleteSingleStudent = (studentIds: number[]) => {
    const { deleteStudent } = this.props;
    studentIds.forEach(id => deleteStudent(id));
  }
}

const mapStateToProps = (state: IStore) => ({
  fetching: state.students.fetching,
  students: state.students.users.filter(stud => stud.id !== state.userInformation.id),
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
  deleteStudent: (id: number) => dispatch(deleteSingleStudent(id)),
  deleteStudents: () => dispatch(deleteAllStudents()),
  fetchStudents: () => dispatch(fetchAllStudents()),
});

const ViewStudents = connect(
  mapStateToProps,
  mapDispatchToProps,
)(_Container);

export default ViewStudents;
