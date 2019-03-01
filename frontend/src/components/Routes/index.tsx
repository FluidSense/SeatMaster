import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { IStore } from '../../store';
import { fetchUserData } from './actions';
import { Presentational } from './Presentational';

const mapStateToProps = (state: IStore) => ({
  oidc: state.oidc,
  userInformation: state.userInformation,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
  fetchUserData: (idToken: string) => dispatch(fetchUserData(idToken)),
});

const Routes = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Presentational);

export default Routes;
