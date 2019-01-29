import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { exampleActionHappened } from '../state/example/action';
import { ExampleComponent } from './ExampleComponent';

const mapDispatchToProps = (dispatch: Dispatch) => ({
  initAction: () => dispatch(exampleActionHappened('test')),
});

const ExampleContainer = connect(null, mapDispatchToProps)(ExampleComponent);

export default ExampleContainer;
