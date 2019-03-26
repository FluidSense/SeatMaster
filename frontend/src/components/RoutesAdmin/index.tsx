import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import AdminApplication from '../AdminApplication';
import AdminApplicationOverview from '../AdminApplicationOverview';
import AdminRoom from '../AdminRoom';
import Application from '../Application/index';
import CreateSeason from '../CreateSeason';
import FAQ from '../FAQ';
import Header from '../Header';
import Home from '../Home';
import Page404 from '../Page404';
import Profile from '../Profile';
import Rooms from '../Rooms';
import SideBar from '../SideBar';
import ViewRooms from '../ViewRooms';
import ViewStudents from '../ViewStudents';

export const RoutesAdmin = () => {
  return (
    <>
      <Header />
      <div className="main-page">
        <SideBar />
        <Switch>
          <Route exact={true} path="/" component={Home} />

          <Route path="/application" component={Application} />
          <Route exact={true} path="/admin/rooms" component={ViewRooms} />
          <Route path="/FAQ" component={FAQ} />
          <Route path="/rooms" component={Rooms} />
          <Route path="/profile" component={Profile} />

          <Route exact={true} path="/admin/rooms/create-room" component={AdminRoom} />
          <Route path="/admin/create-season" component={CreateSeason} />
          <Route path="/admin/rooms/update-room" component={AdminRoom} />
          <Route exact={true} path="/admin/applications" component={AdminApplicationOverview} />
          <Route path="/admin/applications/:id" component={AdminApplication} />
          <Route exact={true} path="/admin/students/" component={ViewStudents} />

          <Redirect from="/registerUser" to="/" />
          <Route path="/" component={Page404} />
        </Switch>
      </div>
    </>
  );
};
