import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

import { IStore } from '../../store';
import { fetchUserRegistered } from './actions';
import { Presentational } from './Presentational';

const mapStateToProps = (state: IStore) => ({
  isLoadingUser: state.oidc.isLoadingUser,
  user: state.oidc.user,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
  fetchUserRegistered: (feideId: string) => dispatch(fetchUserRegistered(feideId)),
  push: (endpoint: string) => dispatch(push(endpoint)),
});

const Callback = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Presentational);

export default Callback;
