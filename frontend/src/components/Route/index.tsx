import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import AdminRoom from '../AdminRoom';
import Application from '../Application';
import AssignSeat from '../AssignSeat';
import CreateSeason from '../CreateSeason';
import { Header } from '../Header';
import Home from '../Home';
import ViewRoom from '../ViewRooms';

export const Routing = () => {
  return (
    <div>
      <Header />
      <Switch>
        <Route path="/home" component={Home} />
        <Route path="/application" component={Application} />
        <Route exact={true} path="/admin/rooms" component={ViewRoom} />
        <Route exact={true} path="/admin/rooms/create-room" component={AdminRoom} />
        <Route path="/admin/create-season" component={CreateSeason} />
        <Route path="/admin/rooms/update-room" component={AdminRoom} />
        <Route path="/admin/applications" component={AssignSeat} />
      </Switch>
    </div>
  );
};
