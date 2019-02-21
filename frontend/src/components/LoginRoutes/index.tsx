import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import Callback from '../Callback/index';
import Login from '../Login';

export const LoginRoutes = () => {
  return (
    <Switch>
      <Route exact={true} path="/" component={Login} />
      <Route path="/callback" component={Callback} />
    </Switch>
  );
};
