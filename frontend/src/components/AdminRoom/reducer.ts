import { AnyAction } from 'redux';
import { IRoom } from '../ViewRooms';
import { CREATE_ROOM, DELETE_ROOM, FETCH_ROOM_CSV, RESET_PAGE, UPDATE_ROOM } from './constants';
import { _ALERT_CREATED_MESSAGE, _ALERT_DELETED_MESSAGE, _ALERT_UPDATED_MESSAGE } from './strings';

export interface IAdminRoomState {
  error?: string;
  success?: boolean;
  room?: IRoom;
}

const initialState = {
  error: undefined,
  success: undefined,
};

const reducer = (
  state: IAdminRoomState = initialState,
  action: AnyAction,
): IAdminRoomState => {
  const { type, success, room } = action;
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

    case FETCH_ROOM_CSV:
      return {
        ...state,
        room,
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
