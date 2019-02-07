import { connect } from 'react-redux';
import { ApplicationFormComponent } from './ApplicationFormComponent';

const mapStateToProps = (state: any) => ({
  email: state.userInformation.email,
  fullname: state.userInformation.fullname,
  phone: state.userInformation.phone,
  status: state.userInformation.status,
  username: state.userInformation.username,
});

const ApplicationFormContainer = connect(
  mapStateToProps,
  null,
)(ApplicationFormComponent);

export default ApplicationFormContainer;
