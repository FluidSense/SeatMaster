import React from 'react';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { IPostAdminApplicationForm, IUser } from '../../API/interfaces';
import { IStore } from '../../store';
import { IApplication } from '../Application';
import { APP_APPROVED, APP_SUBMITTED } from '../commonConstants';
import { updateSingleApplication } from '../EditApplication/actions';
import { ISeat } from '../Seats';
import { IRoom } from '../ViewRooms';
import { assignUserToSeat, checkSeatIsOccupied, removeStudent } from './actions';
import './assignSeat.css';
import Presentational from './Presentational';

interface IDispatchProps {
  assignSeat: (user: IUser, seat: ISeat) =>
    ThunkAction<Promise<void>, {}, {}, AnyAction>;
  fetchSeatInfo: (seatId: number) => void;
  removeStudentFromSeat: (roomId: number, seatId: string) => void;
  updateApplication: (id: number, app: IPostAdminApplicationForm) => void;
}

interface IOwnProps {
  application: IApplication;
  rooms: IRoom[];
}

interface IStateProps {
  applications: IApplication[];
  seatInfo?: ISeat;
}

interface IOwnState {
  modalOpen: boolean;
}

type Props = IDispatchProps & IOwnProps & IStateProps;

// tslint:disable-next-line:class-name
class _Container extends React.Component<Props, IOwnState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      modalOpen: false,
    };
  }

  public render() {
    const { modalOpen } = this.state;
    return (
      <Presentational
        assignUserToSeat={this.seatAssign}
        rooms={this.props.rooms}
        checkSeat={this.checkIfSeatOccupied}
        toggleModal={this.toggleModal}
        modalOpen={modalOpen}
        seatInfo={this.props.seatInfo}
        accept={this.changeStudentSeats}
      />);
  }

  private toggleModal = () => {
    const { modalOpen } = this.state;
    this.setState({ modalOpen: !modalOpen });
  }

  private seatAssign = (seat: ISeat) => {
    const { seatInfo, assignSeat, application } = this.props;
    const { user } = application;
    if (!user) return;
    if (seatInfo && seatInfo.user) {
      this.toggleModal();
      return;
    }
    if (user) assignSeat(user, seat);
  }

  private checkIfSeatOccupied = async (seat: ISeat) => {
    const { fetchSeatInfo } = this.props;
    await fetchSeatInfo(seat.id);
  }

  private changeStudentSeats = async () => {
    const { application, seatInfo, assignSeat, updateApplication, applications } = this.props;
    if (!seatInfo || !seatInfo.user || !application || !application.user) {
      return;
    }
    const newSeat = seatInfo;
    const occupiedSeatUser = seatInfo.user;
    const currentUser = application.user;
    // If the current student has a room and the chosen room is currently occupied, switch
    if (application.seat) {
      const currentSeat = application.seat;
      await assignSeat(occupiedSeatUser, currentSeat);
      await assignSeat(currentUser, newSeat);
    } else {
      // If the current student is not assigned anything, but room is occupied, take
      await assignSeat(currentUser, newSeat);
      const userApp = applications.find(app => app.user.id === occupiedSeatUser.id);
      if (userApp && userApp.status === APP_APPROVED) {
        await updateApplication(occupiedSeatUser.id, { status: APP_SUBMITTED });
      }
    }
    this.toggleModal();
  }
}

const mapStateToProps = (state: IStore) => ({
  applications: state.applications.applications,
  seatInfo: state.assignSeat.seat,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
  assignSeat: (user: IUser, seat: ISeat) =>
    dispatch(assignUserToSeat(user, seat)),
  fetchSeatInfo: (seatId: number) =>
    dispatch(checkSeatIsOccupied(seatId)),
  removeStudentFromSeat: (seatId: number) =>
    dispatch(removeStudent(seatId)),
  updateApplication: (id: number, app: IPostAdminApplicationForm) =>
    dispatch(updateSingleApplication(id, app)),
});

const Container = connect(
  mapStateToProps,
  mapDispatchToProps,
)(_Container);

export default Container;
