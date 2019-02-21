import * as React from 'react';
import './App.css';
import Callback from './components/Callback/index';
import Login from './components/Login';
import UserPage from './components/UserPage';

import { ConnectedRouter } from 'connected-react-router';
import {
  Route,
  Switch,
} from 'react-router-dom';
import history from './components/History';

class App extends React.Component {
  public render() {
    return (
      <ConnectedRouter history={history} >
        <UserPage />
      </ConnectedRouter>
    );
  }
}

export default App;
