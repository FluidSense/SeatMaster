import * as React from 'react';
import { Route } from 'react-router-dom';
import Application from '../Application';
import CreateSeason from '../CreateSeason';
import { Header } from '../Header';
import Home from '../Home';

export const Routing = () => {
  return (
    <div>
      <Header />
      <Route path="/home" component={Home} />
      <Route path="/application" component={Application} />
      <Route path="/admin/create-season" component={CreateSeason} />
    </div>
  );
};
