import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { IUser } from '../../API/interfaces';
import { IStore } from '../../store';
import { lowerIncludes } from '../../utils/searchBarFilter';
import { searchBarEvent } from '../SearchBar';
import { fetchAllRooms } from './actions';
import Presentational from './Presentational';

export interface IRoom {
  id: number;
  info: string;
  name: string;
  seats: {
    count: number;
    seats: ISeat[];
  };
}

export interface ISeat {
  id: string;
  info: string;
  roomId: number;
  user?: IUser;
}

export interface IStateProps {
  fetching: string;
  rooms: IRoom[];
}

interface IDispatchProps {
  fetchRooms: () => void;
}

export interface IRouterProps {
  history: {
    push: (path: string) => void;
  };
}

interface IState {
  rooms: IRoom[];
  filteredRooms: IRoom[];
}

type Props = IStateProps & IDispatchProps & IRouterProps;

// tslint:disable-next-line:class-name
class _Container extends Component<Props, IState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      filteredRooms: props.rooms,
      rooms: props.rooms,
    };
  }
  public componentDidMount = () => this.props.fetchRooms();

  public componentDidUpdate = (prevProps: Props) => {
    const { rooms } = this.props;
    if (prevProps.rooms !== rooms) {
      this.setState({ rooms, filteredRooms: rooms });
    }
  }

  public render() {
    const { history, fetching } = this.props;
    const { filteredRooms } = this.state;
    const onClick = () => history.push('/admin/rooms/create-room');
    return (
      <Presentational
        rooms={filteredRooms}
        onClick={onClick}
        fetching={fetching}
        filterRooms={this.filterRooms}
      />);
  }

  private filterRooms = (event: searchBarEvent) => {
    const { rooms } = this.state;
    const { value } = event.target;
    const filteredRooms = rooms.filter((room) => {
      if (lowerIncludes(room.name, value) || lowerIncludes(room.info, value)) {
        return room;
      }
    });
    this.setState({ filteredRooms });
  }
}

const mapStateToProps = (state: IStore) => ({
  fetching: state.rooms.fetching,
  rooms: state.rooms.rooms,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
  fetchRooms: () => dispatch(fetchAllRooms()),
});

const ViewRooms = connect(
  mapStateToProps,
  mapDispatchToProps,
)(_Container);

export default ViewRooms;
