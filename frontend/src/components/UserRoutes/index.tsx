import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import Application from '../Application/index';
import Callback from '../Callback/index';
import Home from '../Home';

export const UserRoutes = () => {
  return (
    <Switch>
      <Route exact={true} path="/" component={Home} />
      <Route path="/home" component={Home} />
      <Route path="/application" component={Application} />
      <Route path="/callback" component={Callback} />
    </Switch>
  );
};
