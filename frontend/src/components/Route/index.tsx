import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import Application from '../Application';
import CreateRoom from '../CreateRoom';
import CreateSeason from '../CreateSeason';
import { Header } from '../Header';
import Home from '../Home';
import SideBar from '../SideBar/';
import ViewRoom from '../ViewRooms';

export const Routing = () => {
  return (
    <>
      <Header />
      <div className="main-page">
        <SideBar />
        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/application" component={Application} />
          <Route exact={true} path="/admin/rooms" component={ViewRoom} />
          <Route exact={true} path="/admin/rooms/create-room" component={CreateRoom} />
          <Route path="/admin/create-season" component={CreateSeason} />
          {/* Will be edited in other pull request */}
          <Route path="/admin/rooms/update-room-:id" component={CreateRoom} />
        </Switch>
      </div>
    </>
  );
};
