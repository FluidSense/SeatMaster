import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { fetchUserData } from './LoginActions';
import { LoginComponent } from './LoginComponent';

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
  fetchUserData: (userID: number) => dispatch(fetchUserData(userID)),
});

const LoginContainer = connect(
  null,
  mapDispatchToProps,
)(LoginComponent);

export default LoginContainer;
