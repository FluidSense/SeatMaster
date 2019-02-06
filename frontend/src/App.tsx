import * as React from 'react';

import './App.css';
import ApplicationComponent from './components/Application/ApplicationComponent';
import HomeComponent from './components/Home/HomeComponent';
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
          <Route exact={true} path="/" component={HomeComponent} />
          <Route path="/login" component={LoginContainer} />
          <Route path="/application" component={ApplicationComponent} />
        </div>
      </Router>
    );
  }
}

export default App;
