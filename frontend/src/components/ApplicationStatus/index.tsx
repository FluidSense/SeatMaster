import { connect } from 'react-redux';
import { IStore } from '../../store';
import './applicationStatus.css';
import Presentational from './Presentational';

const mapStateToProps = (state: IStore) => ({
  applicationStatus: state.userInformation.applicationStatus,
});

const ApplicationStatus = connect(
  mapStateToProps,
  null,
)(Presentational);

export default ApplicationStatus;
