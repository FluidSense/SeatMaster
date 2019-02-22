import * as React from 'react';
import './App.css';
import Routes from './components/Routes';

import { ConnectedRouter } from 'connected-react-router';
import history from './components/History';

class App extends React.Component {
  public render() {
    return (
      <ConnectedRouter history={history} >
        <Routes />
      </ConnectedRouter>
    );
  }
}

export default App;
