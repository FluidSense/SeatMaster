import KnappBase from 'nav-frontend-knapper';
import * as React from 'react';
import { connect } from 'react-redux';
import userManager from './../../utils/userManager';
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
