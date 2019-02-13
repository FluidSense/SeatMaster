import { AnyAction } from 'redux';
import { ACTION_NONE, SET_USER_DATA } from './Strings';

export interface ILoginState {
  comments?: string;
  email: string;
  fullname: string;
  id?: number;
  phone: string;
  status: string;
  user?: {
    id: number;
    username: string;
  };
}

const initialState = {
  comments: undefined,
  email: 'test@test.com',
  fullname: 'Test Testesen',
  id: undefined,
  phone: '11223344',
  status: 'Master student',
  user: {
    id: 1,
    username: 'usrnam',
  },
};

export const loginReducer = (
  state: ILoginState = initialState,
  action: AnyAction,
): ILoginState => {
  const { type, payload } = action;
  switch (type) {
    case SET_USER_DATA: {
      return {
        ...state,
        comments: payload.comments,
        email: payload.email,
        fullname: payload.fullname,
        id: payload.id,
        phone: payload.phone,
        status: payload.status,
        user: payload.user,
      };
    }
    default:
      return state;
  }
};
