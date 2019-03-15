import { connect } from 'react-redux';
import { IStore } from '../../store';
import Presentational from './Presentational';

// TODO actually get the application for the person in the URL
const mapStateToProps = (state: IStore) => ({
  application: state.applications.registeredApplication,
});

const Container = connect(
  mapStateToProps,
)(Presentational);

export default Container;
