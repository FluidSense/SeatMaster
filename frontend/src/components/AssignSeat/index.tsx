import { connect } from 'react-redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { IStore } from '../../store';
import Presentational from './Presentational';

const mapStateToProps = (state: IStore) => ({
  applications: state.applications.applications,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({

});

const Container = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Presentational);

export default Container;
