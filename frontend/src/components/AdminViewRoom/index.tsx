import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { IPostAdminApplicationForm, IUser } from '../../API/interfaces';
import { IStore } from '../../store';
import { fetchAllApplications } from '../AdminApplicationOverview/actions';
import { fetchRoomInformation } from '../AdminRoom/actions';
import { assignUserToSeat, removeStudent } from '../AssignSeat/actions';
import { updateSingleApplication } from '../EditApplication/actions';
import { ISeat } from '../Seats';
import { fetchAllRooms } from '../ViewRooms/actions';
import Presentational from './Presentational';

const mapStateToProps = (state: IStore) => ({
  applications: state.applications.applications,
  rooms: state.rooms.rooms,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
  assign: (user: IUser, seat: ISeat) => dispatch(assignUserToSeat(user, seat)),
  delete: (seat: ISeat) => dispatch(removeStudent(seat.id)),
  fetchRoom: (roomId: number) => dispatch(fetchRoomInformation(roomId)),
  fetchRooms: () => dispatch(fetchAllRooms()),
  getAllApplications: () => dispatch(fetchAllApplications()),
  updateApplication: (id: number, app: IPostAdminApplicationForm) =>
    dispatch(updateSingleApplication(id, app)),
});

const Container = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Presentational);

export default Container;
