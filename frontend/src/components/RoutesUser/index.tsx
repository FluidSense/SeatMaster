import * as React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Application from '../Application/index';
import Callback from '../Callback/index';
import { Header } from '../Header';
import Home from '../Home';

export const RoutesUser = () => {
  return (
    <>
      <Header />
      <Switch>
        <Route exact={true} path="/" component={Home} />
        <Redirect from="/home" to="/" />
        <Route path="/application" component={Application} />
        <Route path="/callback" component={Callback} />
      </Switch>
    </>
  );
};
