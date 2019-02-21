import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import Application from '../Application/index';
import Callback from '../Callback/index';
import Home from '../Home';
import Login from '../Login';

export const LoginRoutes = () => {
  return (
    <Switch>
      <Route exact={true} path="/" component={Login} />
      <Route path="/callback" component={Callback} />
    </Switch>
  );
};
