import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { OidcProvider, loadUser } from 'redux-oidc';
import App from './App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import { configureStore } from './store';
import userManager from './utils/userManager';

const store = configureStore();
loadUser(store, userManager);

ReactDOM.render(
  <Provider store={store}>
    <OidcProvider store={store} userManager={userManager} >
        <App />
    </OidcProvider>
  </Provider>,
  document.getElementById('root'),
);
registerServiceWorker();
