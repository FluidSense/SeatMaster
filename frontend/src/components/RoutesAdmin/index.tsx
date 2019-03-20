import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import AdminApplication from '../AdminApplication';
import AdminApplicationOverview from '../AdminApplicationOverview';
import AdminRoom from '../AdminRoom';
import Application from '../Application/index';
import CreateSeason from '../CreateSeason';
import Header from '../Header';
import Home from '../Home';
import SideBar from '../SideBar';
import ViewRoom from '../ViewRooms';

export const RoutesAdmin = () => {
  return (
    <>
      <Header />
      <div className="main-page">
        <SideBar />
        <Switch>
          <Route exact={true} path="/" component={Home} />

          <Route path="/application" component={Application} />
          <Route exact={true} path="/admin/rooms" component={ViewRoom} />
          <Route exact={true} path="/admin/rooms/create-room" component={AdminRoom} />
          <Route path="/admin/create-season" component={CreateSeason} />
          <Route path="/admin/rooms/update-room" component={AdminRoom} />
          <Route exact={true} path="/admin/applications" component={AdminApplicationOverview} />
          <Route path="/admin/applications/:id" component={AdminApplication} />

          <Redirect from="/registerUser" to="/" />
          <Redirect from="/" to="/" /> {/** TODO add 404 */}
        </Switch>
      </div>
    </>
  );
};