import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { exampleActionHappened } from '../../state/example/action';
import { ApplicationComponent } from './ApplicationComponent';

const mapDispatchToProps = (dispatch: Dispatch) => ({
  initAction: () => dispatch(exampleActionHappened('test')),
});

const ApplicationContainer = connect(null, mapDispatchToProps)(ApplicationComponent);

export default ApplicationContainer;
