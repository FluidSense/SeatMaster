import * as React from 'react';
import { Route } from 'react-router-dom';
import Application from '../Application/index';
import { Header } from '../Header';
import Home from '../Home';

export const Routing = () => {
  return (
    <div>
      <Header />
      <Route path="/home" component={Home} />
      <Route path="/application" component={Application} />
    </div>
  );
};
