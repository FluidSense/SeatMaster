import * as React from 'react';
import './App.css';

import ApplicationContainer from './components/Application/ApplicationContainer';
import HomeContainer from './components/Home/HomeContainer';
import LoginContainer from './components/Login/LoginContainer';

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
          <Route exact={true} path="/" component={HomeContainer} />
          <Route path="/login" component={LoginContainer} />
          <Route path="/application" component={ApplicationContainer} />
        </div>
      </Router>
    );
  }
}

export default App;
