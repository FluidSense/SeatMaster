import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { IUser } from '../../API/interfaces';
import { IStore } from '../../store';
import { fetchAllStudents } from './actions';
import Presentational from './Presentational';
import './viewStudents.css';

export interface IStateProps {
  students: IUser[];
}

interface IDispatchProps {
  fetchStudents: () => void;
}

export interface IRouterProps {
  history: {
    push: (path: string) => void;
  };
}

interface IState {
  usersToBeDeleted: number[];
}

type Props = IStateProps & IDispatchProps & IRouterProps;

// tslint:disable-next-line:class-name
class _Container extends Component<Props, IState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      usersToBeDeleted: [],
    };
  }
  public componentDidMount = () => this.props.fetchStudents();

  public render() {
    const { usersToBeDeleted } = this.state;
    const { students } = this.props;
    const disableButton = usersToBeDeleted.length > 0 ? false : true;
    return (
      <Presentational
        users={students}
        disableButton={disableButton}
        userToBeDeleted={this.addUserToBeDeleted}
        usersToBeDeleted={usersToBeDeleted}
        checkAll={this.checkAllOrNone}
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
}

const mapStateToProps = (state: IStore) => ({
  students: state.students.users,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
  fetchStudents: () => dispatch(fetchAllStudents()),
});

const ViewStudents = connect(
  mapStateToProps,
  mapDispatchToProps,
)(_Container);

export default ViewStudents;
