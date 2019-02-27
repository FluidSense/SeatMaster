import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import reduxThunk from 'redux-thunk';
import { applicationSeasonReducer } from './components/ApplicationSeason/reducer';
import { ILoginState, loginReducer } from './components/Login/reducer';
import roomReducer, { IRoomState } from './components/ViewRooms/reducer';

export interface IStore {
  userInformation: ILoginState;
  rooms: IRoomState;
}

export const reducers = combineReducers({
  applicationSeason: applicationSeasonReducer,
  rooms: roomReducer,
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
