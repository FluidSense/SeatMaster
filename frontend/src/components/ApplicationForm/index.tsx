import { connect } from 'react-redux';
import './applicationForm.css';
import { Presentational } from './Presentational';

const mapStateToProps = (state: any) => ({
  email: state.applicationInformation.email,
  fullname: state.applicationInformation.fullname,
  phone: state.applicationInformation.phone,
  status: state.applicationInformation.status,
  username: state.applicationInformation.user.username,
});

const ApplicationForm = connect(
  mapStateToProps,
  null,
)(Presentational);

export default ApplicationForm;
