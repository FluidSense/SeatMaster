import { connect } from 'react-redux';
import './applicationForm.css';
import { Presentational } from './Presentational';

const mapStateToProps = (state: any) => ({
  email: state.userInformation.email,
  fullname: state.userInformation.fullname,
  phone: state.userInformation.phone,
  status: state.userInformation.status,
  username: state.userInformation.user.username,
});

const ApplicationForm = connect(
  mapStateToProps,
  null,
)(Presentational);

export default ApplicationForm;
