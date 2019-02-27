import React from 'react';
import { connect } from 'react-redux';
import { IStore } from '../../store';
import { RoutesLogin } from '../RoutesLogin';
import { RoutesRegister } from '../RoutesRegister';
import { RoutesUser } from '../RoutesUser';

const RoutesRedirect = (props: IStore) => {
  const { oidc, userInformation } = props;

  if (!oidc.user || oidc.user.expired) {
    return <RoutesLogin />;
  }
  if (!checkUserRegistration(oidc.user.id_token)) { // Check user reg
    return <RoutesRegister />;
  }

  // TODO: Add a check for admin privileges and add adminroutes
  return <RoutesUser />;
};

const checkUserRegistration = async (idToken: string) => {
  const response = await fetch('http://localhost:5000/user/');
  return await response.ok ? true : false;
};

const mapStateToProps = (state: IStore) => ({
  oidc: state.oidc,
  userInformation: state.userInformation,
});

const Routes = connect(
  mapStateToProps,
  null,
)(RoutesRedirect);

export default Routes;
