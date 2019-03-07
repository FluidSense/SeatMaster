import { AnyAction } from 'redux';
import { CREATE_ROOM, DELETE_ROOM, RESET_PAGE, UPDATE_ROOM } from './constants';
import { _ALERT_CREATED_MESSAGE, _ALERT_DELETED_MESSAGE, _ALERT_UPDATED_MESSAGE } from './strings';
import { CREATE_SEAT } from '../Seats/constants';

export interface IAdminRoomState {
  error?: string;
  success?: boolean;
}

const initialState = {
  error: undefined,
  success: undefined,
};

const reducer = (
  state: IAdminRoomState = initialState,
  action: AnyAction,
): IAdminRoomState => {
  const { type, success } = action;
  switch (type) {
    case CREATE_ROOM:
      if (success) {
        return {
          ...state,
          success,
        };
      }
      return {
        ...state,
        error: _ALERT_CREATED_MESSAGE,
        success: false,
      };
    case DELETE_ROOM:
      if (success) {
        return {
          ...state,
          success,
        };
      }
      return {
        ...state,
        error: _ALERT_DELETED_MESSAGE,
        success: false,
      };
    case UPDATE_ROOM:
      if (success) {
        return {
          ...state,
          success,
        };
      }
      return {
        ...state,
        error: _ALERT_UPDATED_MESSAGE,
        success: false,
      };
    case RESET_PAGE:
      return {
        ...state,
        success: undefined,
      };
    default:
      return state;
  }
};

export default reducer;
