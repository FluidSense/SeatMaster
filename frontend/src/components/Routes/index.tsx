import React from 'react';
import { connect } from 'react-redux';
import { UserState } from 'redux-oidc';
import { IStore } from '../../store';
import { RoutesLogin } from '../RoutesLogin';
import { RoutesUser } from '../RoutesUser';

const RoutesRedirect = (props: UserState) => {
  const { user } = props;

  if (!user || user.expired) {
    return <RoutesLogin />;
  }

  // TODO: Add a check for admin privileges and add adminroutes
  return <RoutesUser />;
};

const mapStateToProps = (state: IStore) => ({
  isLoadingUser: state.oidc.isLoadingUser,
  user: state.oidc.user,
});

const Routes = connect(
  mapStateToProps,
  null,
)(RoutesRedirect);

export default Routes;
