import { Column, Container, Row } from 'nav-frontend-grid';
import * as React from 'react';
import './App.css';
import Login from './components/Login';

import {
  Redirect,
  Route,
  Router,
  Switch,
} from 'react-router-dom';

import history from './components/History';
import { Routing } from './components/Route';

class App extends React.Component {
  public render() {
    return (
      <Router history={history} >
        <Switch>
          <Route path="/login" component={Login} />
          <Redirect exact={true} from="/" to="/login" />
          <Route component={Routing} />
        </Switch>
      </Router>
    );
  }
}

export default App;
