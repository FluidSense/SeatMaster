import { connectRouter, routerMiddleware } from 'connected-react-router';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { loadUser, reducer as oidcReducer, UserState } from 'redux-oidc';
import reduxThunk from 'redux-thunk';
import {
  AdminReviewApplicationReducer,
  IAdminReviewApplicationState,
} from './components/AdminApplication/reducer';
import {
  ApplicationReducer,
  IApplicationState,
} from './components/AdminApplicationOverview/reducer';
import roomReducer, { IAdminRoomState } from './components/AdminRoom/reducer';
import {
  applicationSeasonReducer,
  IApplicationSeasonState,
} from './components/ApplicationSeason/reducer';
import seatReducer, { ISeatState } from './components/AssignSeat/reducer';
import history from './components/History';
import { IRegisteredUserState, registeredUserReducer } from './components/RegisterUser/reducer';
import viewRoomReducer, { IRoomState } from './components/ViewRooms/reducer';
import userManager from './utils/userManager';

export interface IStore {
  adminReviewApplication: IAdminReviewApplicationState;
  adminRoom: IAdminRoomState;
  applicationSeason: IApplicationSeasonState;
  applications: IApplicationState;
  rooms: IRoomState;
  seats: ISeatState;
  userInformation: IRegisteredUserState;
  oidc: UserState;
  assignSeat: ISeatState;
}

export const reducers = combineReducers({
  adminReviewApplication: AdminReviewApplicationReducer,
  adminRoom: roomReducer,
  applicationSeason: applicationSeasonReducer,
  applications: ApplicationReducer,
  assignSeat: seatReducer,
  oidc: oidcReducer,
  rooms: viewRoomReducer,
  router: connectRouter(history),
  seats: seatReducer,
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
