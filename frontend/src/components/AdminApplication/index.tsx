import { connect } from 'react-redux';
import { IStore } from '../../store';
import Presentational from './Presentational';

const mapStateToProps = (state: IStore) => ({
  application: state.userInformation,
});

const Container = connect(
  mapStateToProps,
)(Presentational);

export default Container;
