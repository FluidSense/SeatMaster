import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { IStore } from '../../store';
import { toggleSideBar } from '../SideBar/action';
import './header.css';
import { Presentational } from './Presentational';

const mapStateToProps = (state: IStore) => ({
  userInformation: state.userInformation,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  toggleSideBar: () => dispatch(toggleSideBar()),
});

const Header = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Presentational);

export default Header;
