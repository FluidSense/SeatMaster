import React from 'react';
import { connect } from 'react-redux';
import { IStore } from '../../store';
import { RoutesLogin } from '../RoutesLogin';
import { RoutesUser } from '../RoutesUser';

const RoutesRedirect = (props: IStore) => {
  const { oidc, userInformation } = props;

  if (!oidc.user || oidc.user.expired) {
    return <RoutesLogin />;
  }
  if (!userInformation) {
    // TODO: return <RoutesRegister>
    return <RoutesUser />;
  }

  // TODO: Add a check for admin privileges and add adminroutes
  return <RoutesUser />;
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
