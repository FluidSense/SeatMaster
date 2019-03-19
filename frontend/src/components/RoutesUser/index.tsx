import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Application from '../Application/index';
import Header from '../Header';
import Home from '../Home';
import SideBar from '../SideBar';

export const RoutesUser = () => {
  return (
    <>
      <Header />
      <div className="main-page">
        <SideBar />
        <Switch>
          <Route exact={true} path="/" component={Home} />
          <Route path="/application" component={Application} />

          <Redirect from="/registerUser" to="/" />
          <Redirect from="/" to="/" /> {/** TODO add 404 */}
        </Switch>
      </div>
    </>
  );
};
