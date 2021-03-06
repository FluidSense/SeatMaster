import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Application from '../Application/index';
import FAQ from '../FAQ';
import Footer from '../Footer';
import Header from '../Header';
import Home from '../Home';
import Page404 from '../Page404';
import Profile from '../Profile';
import Rooms from '../Rooms';
import SelfEditApplication from '../SelfEditApplication';
import SideBar from '../SideBar';

export const RoutesUser = () => {
  return (
    <>
      <Header />
      <div className="main-page">
        <SideBar />
        <Switch>
          <Route exact={true} path="/" component={Home} />
          <Route path="/edit" component={SelfEditApplication} />
          <Route path="/application" component={Application} />
          <Route path="/FAQ" component={FAQ} />
          <Route path="/rooms" component={Rooms} />
          <Route path="/profile" component={Profile} />

          <Redirect from="/registerUser" to="/" />
          <Route path="/" component={Page404} />
        </Switch>
      </div>
      <Footer />
    </>
  );
};
