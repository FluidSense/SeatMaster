import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { sendApplicationFormData, updateApplicationFormData } from './ApplicationFormActions';
import { ApplicationFormComponent } from './ApplicationFormComponent';

const mapStateToProps = (state: any) => ({
  email: state.userInformation.email,
  fullname: state.userInformation.fullname,
  phone: state.userInformation.phone,
  status: state.userInformation.status,
  username: state.userInformation.username,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
  sendApplicationFormData: () => dispatch(sendApplicationFormData()),
  updateApplicationFormData: (item: React.FormEvent) => dispatch(updateApplicationFormData(item)),
});

const ApplicationFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ApplicationFormComponent);

export default ApplicationFormContainer;
