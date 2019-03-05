import KnappBase from 'nav-frontend-knapper';
import * as React from 'react';
import './header.css';
import userManager from './../../utils/userManager';
import { connect } from 'react-redux';
import { Presentational } from './Presentational';

const mapStateToProps = (state: any) => ({
  userInformation: state.userInformation,
});

const Header = connect(
  mapStateToProps,
  null,
)(Presentational);

export default Header;
