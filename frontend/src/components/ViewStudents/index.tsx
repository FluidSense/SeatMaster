import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { IUser } from '../../API/interfaces';
import { IStore } from '../../store';
import { lowerIncludes } from '../../utils/searchBarFilter';
import { searchBarEvent } from '../SearchBar';
import { deleteAllStudents, deleteSingleStudent, fetchAllStudents } from './actions';
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
  filteredStudents: IUser[];
  students: IUser[];
  usersToBeDeleted: number[];
}

type Props = IStateProps & IDispatchProps;

// tslint:disable-next-line:class-name
class _Container extends Component<Props, IState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      filteredStudents: props.students,
      students: props.students,
      usersToBeDeleted: [],
    };
  }
  public componentDidMount = () => this.props.fetchStudents();

  public componentDidUpdate = (prevProps: Props) => {
    const { students } = this.props;
    if (prevProps.students !== students) {
      this.setState({ students, filteredStudents: students });
    }
  }

  public render() {
    const { usersToBeDeleted, filteredStudents, students } = this.state;
    const { deleteStudents, fetching } = this.props;
    const disableButton = usersToBeDeleted.length > 0 ? false : true;
    return (
      <Presentational
        users={students}
        filteredStudents={filteredStudents}
        filterStudents={this.filterStudents}
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
    const { students } = this.state;
    const { value } = event.target;
    const filteredStudents = students.filter((student) => {
      if (student) {
        if (lowerIncludes(student.username, value)
        || lowerIncludes(student.email, value)
        || lowerIncludes(student.fullname, value)
        ) return student;
      }
    });
    this.setState({ filteredStudents });
  }

  private checkAllOrNone = (all: boolean) => {
    const { students } = this.state;
    if (all) {
      this.setState({ usersToBeDeleted: [] });
    } else {
      const allUserIds = this.props.students.map(student => student.id);
      this.setState({
        filteredStudents: students,
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
  students: state.students.users,
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
