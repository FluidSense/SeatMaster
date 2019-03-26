import { AnyAction } from 'redux';
import { ISeat } from '../ViewRooms';
import { FETCH_SEAT, REMOVE_STUDENT_SUCCESS } from './constants';

export interface ISeatState {
  seat?: ISeat;
}

const initialState = {
  seat: undefined,
};

const reducer = (
  state: ISeatState = initialState,
  action: AnyAction,
): ISeatState => {
  const { type, payload } = action;
  switch (type) {
    case REMOVE_STUDENT_SUCCESS:
      return state;
    case FETCH_SEAT:
      return { ...state, seat: payload };
    default:
      return state;
  }
};

export default reducer;
