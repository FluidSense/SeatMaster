import { AnyAction } from 'redux';
import { FETCH_ROOMS, FETCHED_ROOMS, FETCHING_ROOMS } from './constants';
import { IRoom } from './index';

export interface IRoomState {
  fetching: string;
  rooms: IRoom[];
}

const initialState = {
  fetching: FETCHING_ROOMS,
  rooms: [],
};

const reducer = (
  state: IRoomState = initialState,
  action: AnyAction,
): IRoomState => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_ROOMS:
      return {
        ...state,
        fetching: FETCHED_ROOMS,
        rooms: Object.values(payload),
      };
    default:
      return state;
  }
};

export default reducer;
