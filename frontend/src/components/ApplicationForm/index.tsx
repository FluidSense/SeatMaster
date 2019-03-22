import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { IRoom } from '../ViewRooms';
import { fetchAllRooms } from '../ViewRooms/actions';
import './applicationForm.css';
import { Presentational } from './Presentational';

const mapStateToProps = (state: any) => ({
  rooms: state.rooms.rooms,
  userInformation: state.userInformation,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
  getRooms: () => dispatch(fetchAllRooms()),
});

const ApplicationForm = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Presentational);

export default ApplicationForm;
