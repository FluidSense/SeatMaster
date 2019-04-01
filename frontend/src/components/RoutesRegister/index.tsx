import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import RegisterUser from '../RegisterUser';

export const RoutesRegister = () => {
  return (
    <Switch>
      <Route path="/" component={RegisterUser} />
    </Switch>
  );
};
