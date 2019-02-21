import * as React from 'react';
import './App.css';
import UserPage from './components/UserPage';

import { ConnectedRouter } from 'connected-react-router';
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
