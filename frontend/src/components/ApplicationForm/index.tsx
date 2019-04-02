import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { IStore } from '../../store';
import { IApplication } from '../Application';
import { fetchAllRooms } from '../ViewRooms/actions';
import { setApplication } from './actions';
import './applicationForm.css';
import { Presentational } from './Presentational';

const mapStateToProps = (state: IStore) => ({
  application: state.applications.registeredApplication,
  rooms: state.rooms.rooms,
  userInformation: state.userInformation,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
  getRooms: () => dispatch(fetchAllRooms()),
  setApplication: (application: IApplication) => dispatch(setApplication(application)),
});

const ApplicationForm = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Presentational);

export default ApplicationForm;
