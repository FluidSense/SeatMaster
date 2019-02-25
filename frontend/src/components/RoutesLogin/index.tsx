import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Login from '../Login';
import { LoginError } from '../LoginError/LoginError';

export const RoutesLogin = () => {
  return (
    <Switch>
      <Route exact={true} path="/loginerror" component={LoginError} />
      <Route path="/" component={Login} />
      <Redirect from="/" to="/" />
    </Switch>
  );
};
