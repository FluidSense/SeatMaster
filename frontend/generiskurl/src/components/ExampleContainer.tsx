import { exampleActionHappened } from "../state/example/action";
import { ExampleComponent } from "./ExampleComponent";
import { connect } from "react-redux";
import { Dispatch } from "redux";


const mapDispatchToProps = (dispatch: Dispatch) => ({
  initAction: () => dispatch(exampleActionHappened("test")),
});

const ExampleContainer = connect(null, mapDispatchToProps)(ExampleComponent);

export default ExampleContainer;