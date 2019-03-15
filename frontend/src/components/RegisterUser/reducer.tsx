import { AnyAction } from 'redux';

export interface IRegisteredUserState {
  email?: string;
  fullname?: string;
  id?: number;
  loading: boolean;
  masterStatus?: string;
  registered: boolean;
  username?: string;
}

const initialState = {
  email: undefined,
  fullname: undefined,
  id: undefined,
  loading: false,
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
        ...payload,
        loading: false,
        registered: true,
      };
    }
    case 'REMOVE_USER_DATA': {
      return {
        ...state,
        email: undefined,
        fullname: undefined,
        id: undefined,
        loading: false,
        masterStatus: undefined,
        registered: false,
        username: undefined,
      };
    }
    case 'LOAD_USER_DATA': {
      return {
        ...state,
        loading: true,
      };
    }
    default:
      return state;
  }
};
