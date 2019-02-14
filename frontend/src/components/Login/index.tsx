import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { fetchUserData } from './actions';
import { Presentational } from './Presentational';

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
  fetchUserData: (userID: number) => dispatch(fetchUserData(userID)),
});

const Container = connect(
  null,
  mapDispatchToProps,
)(Presentational);

export default Container;
