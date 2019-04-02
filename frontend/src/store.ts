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
import mailReducer, { IMailState } from './components/Mail/reducer';
import { IRegisteredUserState, registeredUserReducer } from './components/RegisterUser/reducer';
import CRUDSeatReducer, { ISeatIdState } from './components/Seats/reducer';
import { ISideBarState, sideBarReducer } from './components/SideBar/reducer';
import SeasonsReducer, { ISeasonsState } from './components/ViewApplicationSeasons/reducer';
import viewRoomReducer, { IRoomState } from './components/ViewRooms/reducer';
import userReducer, { IUserState } from './components/ViewStudents/reducer';
import userManager from './utils/userManager';

export interface IStore {
  adminReviewApplication: IAdminReviewApplicationState;
  adminRoom: IAdminRoomState;
  applicationSeason: IApplicationSeasonState;
  applications: IApplicationState;
  rooms: IRoomState;
  seats: ISeatState;
  latestSeatId: ISeatIdState;
  mail: IMailState;
  userInformation: IRegisteredUserState;
  oidc: UserState;
  assignSeat: ISeatState;
  sideBar: ISideBarState;
  students: IUserState;
  seasons: ISeasonsState;
}

export const reducers = combineReducers({
  adminReviewApplication: AdminReviewApplicationReducer,
  adminRoom: roomReducer,
  applicationSeason: applicationSeasonReducer,
  applications: ApplicationReducer,
  assignSeat: seatReducer,
  latestSeatId: CRUDSeatReducer,
  mail: mailReducer,
  oidc: oidcReducer,
  rooms: viewRoomReducer,
  router: connectRouter(history),
  seasons: SeasonsReducer,
  seats: seatReducer,
  sideBar: sideBarReducer,
  students: userReducer,
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
