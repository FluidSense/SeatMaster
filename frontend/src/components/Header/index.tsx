import { connect } from 'react-redux';
import './header.css';
import { Presentational } from './Presentational';

const mapStateToProps = (state: any) => ({
  userInformation: state.userInformation,
});

const Header = connect(
  mapStateToProps,
  null,
)(Presentational);

export default Header;
