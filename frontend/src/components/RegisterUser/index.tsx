import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

import { IStore } from '../../store';
import { postCreateUser } from './actions';
import { Presentational } from './Presentational';

const mapStateToProps = (state: IStore) => ({
  isLoadingUser: state.oidc.isLoadingUser,
  loadingUserInformation: state.userInformation.loading,
  user: state.oidc.user,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
  postCreateUser: () => dispatch(postCreateUser()),
  push: (endpoint: string) => dispatch(push(endpoint)),
});

const RegisterUser = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Presentational);

export default RegisterUser;
