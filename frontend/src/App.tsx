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
import { Container, Column, Row } from 'nav-frontend-grid';

class App extends React.Component {
  public render() {
    return (
      <Router history={history}>
        <Container>
          <Row className="">
            <Column lg="3"></Column>
            <Column lg="6">
              <div className="App">
                <Route exact={true} path="/" component={HomeComponent} />
                <Route path="/login" component={LoginContainer} />
                <Route path="/application" component={ApplicationComponent} />
              </div>
            </Column>
            <Column lg="3"></Column>
          </Row>
        </Container>
      </Router>
    );
  }
}

export default App;
