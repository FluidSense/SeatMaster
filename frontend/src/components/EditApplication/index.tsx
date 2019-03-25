import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { IPostAdminApplicationForm } from '../../API/interfaces';
import { IStore } from '../../store';
import { IApplication } from '../Application';
import { updateSingleApplication } from './actions';
import Presentational from './Presentational';

const mapStateToProps = (state: IStore) => ({
  applications: state.applications.applications,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
  updateApplication: (id: number, application: IPostAdminApplicationForm) => {
    return dispatch(updateSingleApplication(id, application));
  },
});

const EditApplication = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Presentational);

export default EditApplication;
