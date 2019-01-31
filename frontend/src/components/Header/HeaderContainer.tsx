import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { exampleActionHappened } from '../../state/example/action';
import { HeaderComponent } from './HeaderComponent';

const mapDispatchToProps = (dispatch: Dispatch) => ({
  initAction: () => dispatch(exampleActionHappened('test')),
});

const HeaderContainer = connect(null, mapDispatchToProps)(HeaderComponent);

export default HeaderContainer;
