import { connect } from 'react-redux';
import { IStore } from '../../store';
import Presentational from './Presentational';

const mapStateToProps = (state: IStore) => ({
  status: state.userInformation.status,
});

const Container = connect(
  mapStateToProps,
  null,
)(Presentational);

export default Container;
