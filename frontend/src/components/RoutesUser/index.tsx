import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Application from '../Application/index';
import { Header } from '../Header';
import Home from '../Home';

export const RoutesUser = () => {
  return (
    <>
      <Header />
      <Switch>
        <Route exact={true} path="/" component={Home} />
        <Redirect from="/home" to="/" />
        <Redirect from="/registerUser" to="/home" />

        <Route path="/application" component={Application} />
        <Route path="/admin/rooms/create-room" component={CreateRoom} />
        <Route path="/admin/create-season" component={CreateSeason} />
      </Switch>
    </>
  );
};
