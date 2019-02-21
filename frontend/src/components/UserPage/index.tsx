import React from 'react';
import { connect } from 'react-redux';
import { UserState } from 'redux-oidc';
import { IStore } from '../../store';
import { LoginRoutes } from '../LoginRoutes';
import { UserRoutes } from '../UserRoutes';

const UserPageRedirect = (props: UserState) => {
  const { user } = props;

  return !user || user.expired ? <LoginRoutes /> : <UserRoutes />;
};

const mapStateToProps = (state: IStore) => ({
  isLoadingUser: state.oidc.isLoadingUser,
  user: state.oidc.user,
});

const UserPage = connect(
  mapStateToProps,
  null,
)(UserPageRedirect);

export default UserPage;
