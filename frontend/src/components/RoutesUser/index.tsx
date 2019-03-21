import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Application from '../Application/index';
import FAQ from '../FAQ';
import Header from '../Header';
import Home from '../Home';
import Rooms from '../Rooms';
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
          <Route path="/FAQ" component={FAQ} />
          <Route path="/rooms" component={Rooms} />

          <Redirect from="/registerUser" to="/" />
          <Redirect from="/" to="/" /> {/** TODO add 404 */}
        </Switch>
      </div>
    </>
  );
};
