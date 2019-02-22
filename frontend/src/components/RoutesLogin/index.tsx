import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Callback from '../Callback/index';
import Login from '../Login';

export const RoutesLogin = () => {
  return (
    <Switch>
      <Route exact={true} path="/callback" component={Callback} />
      <Route path="/" component={Login} />
    </Switch>
  );
};
