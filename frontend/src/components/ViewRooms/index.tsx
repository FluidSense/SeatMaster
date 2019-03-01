import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { IStore } from '../../store';
import { fetchAllRooms } from './actions';
import Presentational from './Presentational';
import './viewRooms.css';

export interface IRoom {
  id: number;
  name: string;
  info: string;
  seat: number;
}

export interface IStateProps {
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

type Props = IStateProps & IDispatchProps & IRouterProps;

// tslint:disable-next-line:class-name
class _Container extends Component<Props> {
  public componentDidMount = () => this.props.fetchRooms();

  public render() {
    const { rooms, history } = this.props;
    const onClick = () => history.push('/admin/rooms/create-room');
    return (<Presentational rooms={rooms} onClick={onClick} />);
  }
}

const mapStateToProps = (state: IStore) => ({
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
