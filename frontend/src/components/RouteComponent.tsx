import * as React from 'react';
import { Route } from 'react-router-dom';
import ApplicationComponent from './Application/ApplicationComponent';
import { HeaderComponent } from './Header/HeaderComponent';
import HomeComponent from './Home/HomeComponent';

export const RouteComponent = () => {
  return (
    <div>
        <HeaderComponent />
        <Route path="/home" component={HomeComponent} />
        <Route path="/application" component={ApplicationComponent} />;
    </div>
  );
};

export default RouteComponent;
