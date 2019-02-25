import * as React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Application from '../Application/index';
import { Header } from '../Header';
import Home from '../Home';
import RegisterUser from '../RegisterUser';

export const RoutesUser = () => {
  return (
    <>
      <Header />
      <Switch>
        <Route exact={true} path="/" component={Home} />
        <Redirect from="/home" to="/" />
        <Route path="/application" component={Application} />
        <Route path="/registerUser" component={RegisterUser} />
        <Route path="/admin/rooms/create-room" component={CreateRoom} />
        <Route path="/admin/create-season" component={CreateSeason} />
      </Switch>
    </>
  );
};
