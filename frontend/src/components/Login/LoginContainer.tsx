import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { exampleActionHappened } from '../../state/example/action';
import { LoginComponent } from './LoginComponent';

const mapDispatchToProps = (dispatch: Dispatch) => ({
  initAction: () => dispatch(exampleActionHappened('test')),
});

const LoginContainer = connect(null, mapDispatchToProps)(LoginComponent);

export default LoginContainer;
