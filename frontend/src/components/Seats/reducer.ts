import { AnyAction } from 'redux';
import { CREATE_SEAT, DELETE_SEAT, UPDATE_SEAT } from './constants';

export interface ISeatState {
  success?: boolean;
}

const initialState = {
  success: undefined,
};

const reducer = (
  state: ISeatState = initialState,
  action: AnyAction,
): ISeatState => {
  const { type, success } = action;
  switch (type) {
    case CREATE_SEAT:
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
