import * as React from 'react';

import './App.css';
import Application from './components/Application';
import Home from './components/Home';
import Login from './components/Login/container';

import {
  Route,
  Router,
} from 'react-router-dom';
import history from './components/History';

class App extends React.Component {
  public render() {
    return (
      <Router history={history}>
        <div className="App">
          <Route exact={true} path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/application" component={Application} />
        </div>
      </Router>
    );
  }
}

export default App;
