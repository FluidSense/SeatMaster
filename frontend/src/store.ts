import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
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
import { ILoginState, loginReducer } from './components/Login/reducer';
import viewRoomReducer, { IRoomState } from './components/ViewRooms/reducer';
import { createUserManager, loadUser } from 'redux-oidc';
import userManager from './utils/userManager';

export interface IStore {
  userInformation: ILoginState;
  applicationSeason: IApplicationSeasonState;
  rooms: IRoomState;
  adminRoom: IAdminRoomState;
  applications: IApplicationState;
}

export const reducers = combineReducers({
  adminRoom: roomReducer,
  applicationSeason: applicationSeasonReducer,
  applications: ApplicationReducer,
  rooms: viewRoomReducer,
  userInformation: loginReducer,
});

declare global {
  // disable ts next line since extending already existing Window
  // tslint:disable-next-line:interface-name
  interface Window { __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any; }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(applyMiddleware(reduxThunk));

export const configureStore = () => createStore(reducers, enhancer);
