import { connect } from 'react-redux';
import { IStore } from '../../store';
import Presentational from './Presentational';

const mapStateToProps = (state: IStore) => ({
  userInformation: state.userInformation,
});

const SideBar = connect(
  mapStateToProps,
  null,
)(Presentational);

export default SideBar;
