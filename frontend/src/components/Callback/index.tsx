import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

import { Presentational } from './Presentational';

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
  push: (endpoint: string) => dispatch(push(endpoint)),
});

const Callback = connect(
  null,
  mapDispatchToProps,
)(Presentational);

export default Callback;
