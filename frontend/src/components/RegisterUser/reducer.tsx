import { AnyAction } from 'redux';

export interface IRegisteredUserState {
  email?: string;
  id?: number;
  registered: boolean;
  username?: string;
}

const initialState = {
  email: undefined,
  id: undefined,
  registered: false,
  username: undefined,
};

export const registeredUserReducer = (
    state: IRegisteredUserState = initialState, action: AnyAction,
  ): IRegisteredUserState => {
  const { type, payload } = action;
  switch (type) {
    case 'SET_USER_DATA': {
      return {
        ...state,
        email: payload.email,
        id: payload.id,
        registered: true,
        username: payload.username,
      };
    }
    case 'REMOVE_USER_DATA': {
      return {
        ...state,
        email: undefined,
        id: undefined,
        registered: false,
        username: undefined,
      };
    }
    default:
      return state;
  }
};
