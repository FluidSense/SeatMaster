import React from 'react';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { IUser } from '../../API/interfaces';
import { IStore } from '../../store';
import { IApplicationInfoObject } from '../ApplicationReview';
import { IRoom, ISeat } from '../ViewRooms';
import { fetchAllRooms } from '../ViewRooms/actions';
import Presentational from './Presentational';
import { assignUserToSeat } from './actions';

interface IDispatchProps {
  getRooms: () => ThunkAction<Promise<void>, {}, {}, AnyAction>;
  assignSeat: (user: IUser, room: IRoom, seat: ISeat) =>
    ThunkAction<Promise<void>, {}, {}, AnyAction>;
}

interface IStateProps {
  rooms: IRoom[];
}

interface IOwnProps {
  application: IApplicationInfoObject;
}

type Props = IDispatchProps & IStateProps & IOwnProps;

// tslint:disable-next-line:class-name
class _Container extends React.Component<Props> {
  public componentDidMount() {
    this.props.getRooms();
  }

  public render() {
    return (<Presentational assignUserToSeat={this.seatAssign} rooms={this.props.rooms} />);
  }

  private seatAssign = (room: IRoom, seat: ISeat) => {
    const user = this.props.application.user;
    if (user) this.props.assignSeat(user, room, seat);
  }
}

const mapStateToProps = (state: IStore) => ({
  rooms: state.rooms.rooms,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
  assignSeat: (user: IUser, room: IRoom, seat: ISeat) =>
    dispatch(assignUserToSeat(user, room, seat)),
  getRooms: () => dispatch(fetchAllRooms()),
});

const Container = connect(
  mapStateToProps,
  mapDispatchToProps,
)(_Container);

export default Container;
