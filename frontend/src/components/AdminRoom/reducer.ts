import { AnyAction } from 'redux';
import { CREATE_ROOM, DELETE_ROOM, RESET_PAGE, UPDATE_ROOM } from './constants';
import { _ALERT_CREATED_MESSAGE, _ALERT_DELETED_MESSAGE, _ALERT_UPDATED_MESSAGE } from './strings';

export interface IAdminRoomState {
  error?: string;
  submitted?: boolean;
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
    case RESET_PAGE:
      return { ...state, submitted: undefined };
    default:
      return state;
  }
};

export default reducer;
