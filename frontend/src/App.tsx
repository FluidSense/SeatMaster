import * as React from 'react';

import './App.css';
import LoginContainer from './components/Login/LoginContainer';

import {
  Redirect,
  Route,
  Router,
  Switch,
} from 'react-router-dom';

import history from './components/History';
import { LoginComponent } from './components/Login/LoginComponent';
import { RouteComponent } from './components/Route/RouteComponent';

class App extends React.Component {
  public render() {
    return (
      <Router history={history} >
        <Switch>
          <Route path="/login" component={LoginComponent} />
          <Redirect exact={true} from="/" to="/login" />
          <Route component={RouteComponent} />
        </Switch>
      </Router>
    );
  }
}

export default App;
