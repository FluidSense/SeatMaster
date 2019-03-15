import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { IUser } from '../../API/interfaces';
import { IStore } from '../../store';
import Presentational from './Presentational';
import './viewStudents.css';

export interface IStateProps {
  students?: any;
}

interface IDispatchProps {
  someting?: any;
  // fetchStudents: () => void;
}

export interface IRouterProps {
  history: {
    push: (path: string) => void;
  };
}

interface IState {
  usersToBeDeleted: number[];
  students: IUser[];
}

type Props = IStateProps & IDispatchProps & IRouterProps;

// tslint:disable-next-line:class-name
class _Container extends Component<Props, IState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      students: [
        { id: 1, username: 'usrnam' },
        { id: 2, username: 'putnam' },
        { id: 3, username: 'sumnam' },
      ],
      usersToBeDeleted: [],
    };
  }
  // public componentDidMount = () => this.props.fetchStudents();

  public render() {
    const { history } = this.props;
    const { usersToBeDeleted, students } = this.state;
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
      const allUserIds = this.state.students.map(student => student.id);
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
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
  // fetchRooms: () => dispatch(fetchAllRooms()),
});

const ViewStudents = connect(
  mapStateToProps,
  mapDispatchToProps,
)(_Container);

export default ViewStudents;
