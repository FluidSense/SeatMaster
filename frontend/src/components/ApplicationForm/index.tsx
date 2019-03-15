import { connect } from 'react-redux';
import { IRoom } from '../ViewRooms';
import './applicationForm.css';
import { Presentational } from './Presentational';

const mapStateToProps = (state: any) => ({
  userInformation: state.userInformation,
});

const ApplicationForm = connect(
  mapStateToProps,
  null,
)(Presentational);

export default ApplicationForm;
