import * as React from 'react';
import './App.css';

import { ApplicationComponent } from './components/Application/ApplicationComponent';
import { HomeComponent } from './components/Home/HomeComponent';
import { LoginComponent } from './components/Login/LoginComponent';

import {
  HashRouter,
  Route,
} from 'react-router-dom';

class App extends React.Component {
  public render() {
    return (
      <HashRouter>
        <div className="App">
          <Route exact={true} path="/" component={HomeComponent} />
          <Route path="/login" component={LoginComponent} />
          <Route path="/application" component={ApplicationComponent} />
        </div>
      </HashRouter>
    );
  }
}

export default App;
