import { connectRouter, routerMiddleware } from 'connected-react-router';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { loadUser, reducer as oidcReducer, UserState } from 'redux-oidc';
import reduxThunk from 'redux-thunk';
import {
  ApplicationReducer,
  IApplicationState,
} from './components/AdminApplicationOverview/reducer';
import roomReducer, { IAdminRoomState } from './components/AdminRoom/reducer';
import {
  applicationSeasonReducer,
  IApplicationSeasonState,
} from './components/ApplicationSeason/reducer';
import history from './components/History';
import viewRoomReducer, { IRoomState } from './components/ViewRooms/reducer';
import userManager from './utils/userManager';
import { IRegisteredUserState, registeredUserReducer } from './components/RegisterUser/reducer';

export interface IStore {
  applicationSeason: IApplicationSeasonState;
  rooms: IRoomState;
  adminRoom: IAdminRoomState;
  applications: IApplicationState;
  userInformation: IRegisteredUserState;
  oidc: UserState;
}

export const reducers = combineReducers({
  adminRoom: roomReducer,
  applicationSeason: applicationSeasonReducer,
  applications: ApplicationReducer,
  rooms: viewRoomReducer,
  oidc: oidcReducer,
  router: connectRouter(history),
  userInformation: registeredUserReducer,
});

declare global {
  // disable ts next line since extending already existing Window
  // tslint:disable-next-line:interface-name
  interface Window { __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any; }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const createStoreWithMiddleware = composeEnhancers(
    applyMiddleware(reduxThunk, routerMiddleware(history)),
  )(createStore);

const store = createStoreWithMiddleware(reducers);
loadUser(store, userManager);

export default store;
