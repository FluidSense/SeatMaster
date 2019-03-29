import { connect } from 'react-redux';
import { IStore } from '../../store';
import { APP_NOT_FOUND } from '../commonConstants';
import './applicationStatus.css';
import Presentational from './Presentational';

const mapStateToProps = (state: IStore) => ({
  applicationStatus: state.applications.registeredApplication ?
    state.applications.registeredApplication.status : APP_NOT_FOUND,
});

const ApplicationStatus = connect(
  mapStateToProps,
  null,
)(Presentational);

export default ApplicationStatus;
