import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { fetchUserData } from './actions';
import { LoginComponent } from './component';

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
  fetchUserData: (userID: number) => dispatch(fetchUserData(userID)),
});

const LoginContainer = connect(
  null,
  mapDispatchToProps,
)(LoginComponent);

export default LoginContainer;
