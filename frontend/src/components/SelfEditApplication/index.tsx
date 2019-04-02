import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { IPostApplicationForm } from '../../API/interfaces';
import { IStore } from '../../store';
import { resetAppStatus } from '../EditApplication/actions';
import { updateSelfApplication } from './actions';
import EditApplication from './Presentational';

const mapStateToProps = (state: IStore) => ({
  application: state.applications.registeredApplication,
  rooms: state.rooms.rooms,
  status: state.applications.api.status,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
  resetStatus: () => dispatch(resetAppStatus()),
  updateApplication: (application: IPostApplicationForm) => {
    return dispatch(updateSelfApplication(application));
  },
});

const SelfEditApplication = connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditApplication);

export default SelfEditApplication;
