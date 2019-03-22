import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

import { IStore } from '../../store';
import { deleteAndRemoveUser } from './actions';
import Presentational from './Presentational';

const mapStateToProps = (state: IStore) => ({
  isLoadingUser: state.oidc.isLoadingUser,
  user: state.oidc.user,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
  deleteAndRemoveUser: () => dispatch(deleteAndRemoveUser()),
});

const Profile = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Presentational);

export default Profile;
