import { Column, Container, Row } from 'nav-frontend-grid';
import * as React from 'react';
import {
  Route,
  Router,
} from 'react-router-dom';
import './App.css';
import ApplicationComponent from './components/Application/ApplicationComponent';
import history from './components/History';
import HomeComponent from './components/Home/HomeComponent';
import LoginContainer from './components/Login/LoginContainer';

class App extends React.Component {
  public render() {
    return (
      <Router history={history}>
        <Container>
          <Row className="">
            <Column lg="2" />
            <Column lg="8">
              <div className="App">
                <Route exact={true} path="/" component={HomeComponent} />
                <Route path="/login" component={LoginContainer} />
                <Route path="/application" component={ApplicationComponent} />
              </div>
            </Column>
            <Column lg="2" />
          </Row>
        </Container>
      </Router>
    );
  }
}

export default App;
