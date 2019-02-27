import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import RegisterUser from '../RegisterUser';

export const RoutesRegister = () => {
  return (
    <Switch>
      <Route exact={true} path="/registerUser" component={RegisterUser} />
      <Redirect from="/" to="/registerUser" />
    </Switch>
  );
};
