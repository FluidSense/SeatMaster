import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { fetchUserData } from './LoginActions';
import { LoginComponent } from './LoginComponent';

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchUserData: (userID: number) => dispatch(fetchUserData(userID)),
});

const LoginContainer = connect(
  null,
  mapDispatchToProps,
)(LoginComponent);

export default LoginContainer;
