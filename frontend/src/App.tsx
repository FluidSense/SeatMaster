import * as React from 'react';
import './App.css';
import Routes from './components/Routes';

import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router-dom';
import Callback from './components/Callback';
import history from './components/History';

class App extends React.Component {
  public render() {
    return (
      <ConnectedRouter history={history} >
        <Switch>
          <Route path="/callback" component={Callback} />
          <Routes />
        </Switch>
      </ConnectedRouter>
    );
  }
}

export default App;
