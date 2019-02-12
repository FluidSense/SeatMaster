import { connect } from 'react-redux';
import { IStore } from '../../store';
import ApplicationStatusComponent from './component';

const mapStateToProps = (state: IStore) => ({
  status: state.userInformation.status,
});

const ApplicationStatusContainer = connect(
  mapStateToProps,
  null,
)(ApplicationStatusComponent);

export default ApplicationStatusContainer;
