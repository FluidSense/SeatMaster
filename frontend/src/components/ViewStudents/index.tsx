import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { IUser } from '../../API/interfaces';
import { IStore } from '../../store';
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
  userList: IUser[];
  usersToBeDeleted: number[];
}

type Props = IStateProps & IDispatchProps;

// tslint:disable-next-line:class-name
class _Container extends Component<Props, IState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      userList: [],
      usersToBeDeleted: [],
    };
  }
  public componentDidMount = () => this.props.fetchStudents();

  public componentDidUpdate = (prevProps: Props) => {
    if (prevProps.students !== this.props.students) {
      this.setState({ userList: this.props.students });
    }
  }

  public render() {
    const { usersToBeDeleted, userList } = this.state;
    const { deleteStudents, fetching } = this.props;
    const disableButton = usersToBeDeleted.length > 0 ? false : true;
    return (
      <Presentational
        users={userList}
        disableButton={disableButton}
        userToBeDeleted={this.addUserToBeDeleted}
        usersToBeDeleted={usersToBeDeleted}
        checkAll={this.checkAllOrNone}
        deleteStudent={this.deleteSingleStudent}
        deleteStudents={deleteStudents}
        fetching={fetching}
      />);
  }

  private checkAllOrNone = (all: boolean) => {
    if (all) {
      this.setState({ usersToBeDeleted: [] });
    } else {
      const allUserIds = this.props.students.map(student => student.id);
      this.setState({ usersToBeDeleted: allUserIds });
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
