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
import seatsReducer, { ISeatState } from './components/Seats/reducer';
import viewRoomReducer, { IRoomState } from './components/ViewRooms/reducer';

export interface IStore {
  adminRoom: IAdminRoomState;
  applicationSeason: IApplicationSeasonState;
  applications: IApplicationState;
  rooms: IRoomState;
  seats: ISeatState;
  userInformation: ILoginState;
}

export const reducers = combineReducers({
  adminRoom: roomReducer,
  applicationSeason: applicationSeasonReducer,
  applications: ApplicationReducer,
  rooms: viewRoomReducer,
  seats: seatsReducer,
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
