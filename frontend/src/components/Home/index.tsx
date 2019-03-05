import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { IStore } from '../../store';
import { fetchApplicationInformation } from './actions';
import { Presentational } from './Presentational';

const mapStateToProps = (state: IStore) => ({
  oidc: state.oidc,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
  fetchApplicationInformation: (username: string) =>
    dispatch(fetchApplicationInformation(username)),
});

const Home = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Presentational);

export default Home;
