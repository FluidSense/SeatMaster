import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { OidcProvider } from 'redux-oidc';
import App from './App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import store from './store';
import userManager from './utils/userManager';

ReactDOM.render(
  <Provider store={store}>
    <OidcProvider store={store} userManager={userManager} >
      <App />
    </OidcProvider>
  </Provider>,
  document.getElementById('root'),
);
registerServiceWorker();
