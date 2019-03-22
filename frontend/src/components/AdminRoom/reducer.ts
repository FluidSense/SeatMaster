import { AnyAction } from 'redux';
import { IRoom } from '../ViewRooms';
import { CREATE_ROOM, DELETE_ROOM, FETCH_ROOM_CSV, RESET_PAGE, UPDATE_ROOM } from './constants';
import { _ALERT_CREATED_MESSAGE, _ALERT_DELETED_MESSAGE, _ALERT_UPDATED_MESSAGE } from './strings';

export interface IAdminRoomState {
  error?: string;
  submitted?: boolean;
  room?: IRoom;
}

const initialState = {
  error: undefined,
  submitted: undefined,
};

const reducer = (
  state: IAdminRoomState = initialState,
  action: AnyAction,
): IAdminRoomState => {
  const { type, payload } = action;
  switch (type) {
    case CREATE_ROOM:
      if (payload) return { ...state, submitted: payload };
      return { ...state, error: _ALERT_CREATED_MESSAGE, submitted: false };
    case DELETE_ROOM:
      if (payload) return { ...state, submitted: payload };
      return { ...state, error: _ALERT_DELETED_MESSAGE, submitted: false };
    case UPDATE_ROOM:
      if (payload) return { ...state, submitted: payload };
      return { ...state, error: _ALERT_UPDATED_MESSAGE, submitted: false };
    case FETCH_ROOM_CSV:
      return { ...state, room: payload };
    case RESET_PAGE:
      return { ...state, submitted: undefined };
    default:
      return state;
  }
};

export default reducer;
