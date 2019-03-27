import { connect } from 'react-redux';
import { IStore } from '../../store';
import Presentational from './Presentational';

const mapStateToProps = (state: IStore) => ({
  applications: state.applications.applications,
});

const Container = connect(
  mapStateToProps,
)(Presentational);

export default Container;
