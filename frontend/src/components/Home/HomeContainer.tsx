import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { exampleActionHappened } from '../../state/example/action';
import { HomeComponent } from './HomeComponent';

const mapDispatchToProps = (dispatch: Dispatch) => ({
  initAction: () => dispatch(exampleActionHappened('test')),
});

const HomeContainer = connect(null, mapDispatchToProps)(HomeComponent);

export default HomeContainer;
