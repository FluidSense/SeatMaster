import { AnyAction } from 'redux';
import { CREATE_SEAT, DELETE_SEAT, UPDATE_SEAT } from './constants';

export interface ISeatIdState {
  success?: boolean;
  latestId: number;
}

const initialState = {
  latestId: -1,
  success: undefined,
};

const reducer = (
  state: ISeatIdState = initialState,
  action: AnyAction,
): ISeatIdState => {
  const { type, success, seat } = action;
  switch (type) {
    case CREATE_SEAT:
      if (success) {
        return {
          ...state,
          latestId: seat.id,
          // tslint:disable-next-line:object-shorthand-properties-first
          success,
        };
      }
      return {
        ...state,
        success: false,
      };
    case DELETE_SEAT:
      if (success) {
        return {
          ...state,
          success,
        };
      }
      return {
        ...state,
        success: false,
      };
    case UPDATE_SEAT:
      if (success) {
        return {
          ...state,
          success,
        };
      }
      return {
        ...state,
        success: false,
      };
    default:
      return state;
  }
};

export default reducer;
