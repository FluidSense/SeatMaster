import * as React from 'react';
import './App.css';
import Callback from './components/Callback/index';
import Login from './components/Login';

import { ConnectedRouter } from 'connected-react-router';
import {
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import history from './components/History';
import Login from './components/Login';
import { Routing } from './components/Route';

class App extends React.Component {
  public render() {
    return (
      <ConnectedRouter history={history} >
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/callback" component={Callback} />
          <Redirect exact={true} from="/" to="/login" />
          <Route component={Routing} />
        </Switch>
      </ConnectedRouter>
    );
  }
}

export default App;
