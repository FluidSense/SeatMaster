import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { IUser } from '../../API/interfaces';
import { IStore } from '../../store';
import { fetchAllApplications } from '../AdminApplicationOverview/actions';
import { assignUserToSeat, removeStudent } from '../AssignSeat/actions';
import { ISeat } from '../ViewRooms';
import { fetchAllRooms } from '../ViewRooms/actions';
import Presentational from './Presentational';

const mapStateToProps = (state: IStore) => ({
  applications: state.applications.applications,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
  delete: (seat: ISeat) => dispatch(removeStudent(seat.roomId, seat.id)),
  fetchRooms: () => dispatch(fetchAllRooms()),
  finalize: (user: IUser, seat: ISeat) => dispatch(assignUserToSeat(user, seat)),
  getAllApplications: () => dispatch(fetchAllApplications()),
});

const Container = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Presentational);

export default Container;
