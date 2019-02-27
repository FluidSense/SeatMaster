import { AnyAction } from 'redux';
import { CREATE_ROOM, DELETE_ROOM, UPDATE_ROOM } from './constants';
import { _ALERT_CREATED_MESSAGE, _ALERT_DELETED_MESSAGE, _ALERT_UPDATED_MESSAGE } from './strings';

export interface IState {
  error?: string;
  submitted: boolean;
}

const initialState = {
  submitted: false,
};

const reducer = (
  state: IState = initialState,
  action: AnyAction,
): IState => {
  const { type, payload } = action;
  switch (type) {
    case CREATE_ROOM:
      if (payload) return { ...state, submitted: payload };
      return { ...state, error: _ALERT_CREATED_MESSAGE };
    default:
      return state;
  }
};

export default reducer;
