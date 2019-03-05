import { AnyAction } from 'redux';

export interface IRegisteredUserState {
  email?: string;
  fullname?: string;
  id?: number;
  masterStatus?: string;
  registered: boolean;
  username?: string;
}

const initialState = {
  email: undefined,
  fullname: undefined,
  id: undefined,
  masterStatus: undefined,
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
        fullname: payload.fullname,
        id: payload.id,
        masterStatus: payload.masterStatus,
        registered: true,
        username: payload.username,
      };
    }
    case 'REMOVE_USER_DATA': {
      return {
        ...state,
        email: undefined,
        fullname: undefined,
        id: undefined,
        masterStatus: undefined,
        registered: false,
        username: undefined,
      };
    }
    default:
      return state;
  }
};
