import { AnyAction } from 'redux';
import { FETCH_ROOMS } from './constants';
import { IRoom } from './index';

export interface IRoomState {
  rooms: IRoom[];
}

const initialState = {
  rooms: [],
};

const reducer = (
  state: IRoomState = initialState,
  action: AnyAction,
): IRoomState => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_ROOMS:
      return { ...state, rooms: payload };
    default:
      return state;
  }
};

export default reducer;
