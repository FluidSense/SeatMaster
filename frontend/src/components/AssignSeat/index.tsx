import React from 'react';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { IUser } from '../../API/interfaces';
import { IApplication } from '../Application';
import { IRoom, ISeat } from '../ViewRooms';
import { assignUserToSeat } from './actions';
import Presentational from './Presentational';

interface IDispatchProps {
  assignSeat: (user: IUser, seat: ISeat) =>
    ThunkAction<Promise<void>, {}, {}, AnyAction>;
}

interface IOwnProps {
  application: IApplication;
  rooms: IRoom[];
}

type Props = IDispatchProps & IOwnProps;

// tslint:disable-next-line:class-name
class _Container extends React.Component<Props> {
  public render() {
    return (<Presentational assignUserToSeat={this.seatAssign} rooms={this.props.rooms} />);
  }

  private seatAssign = (seat: ISeat) => {
    const user = this.props.application.user;
    if (user) this.props.assignSeat(user, seat);
  }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
  assignSeat: (user: IUser, seat: ISeat) =>
    dispatch(assignUserToSeat(user, seat)),
});

const Container = connect(
  null,
  mapDispatchToProps,
)(_Container);

export default Container;
