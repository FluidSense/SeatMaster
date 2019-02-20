import * as React from 'react';
import { Route } from 'react-router-dom';
import Application from '../Application';
import CreateRoom from '../CreateRoom';
import CreateSeason from '../CreateSeason';
import { Header } from '../Header';
import Home from '../Home';

export const Routing = () => {
  return (
    <div>
      <Header />
      <Route path="/home" component={Home} />
      <Route path="/application" component={Application} />
      <Route path="/admin/rooms/create-room" component={CreateRoom} />
      <Route path="/admin/create-season" component={CreateSeason} />
    </div>
  );
};
