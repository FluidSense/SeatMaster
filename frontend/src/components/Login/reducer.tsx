import { AnyAction } from 'redux';
import { APP_NOT_FOUND, SET_USER_DATA } from './constants';

export interface ILoginState {
  applicationStatus: string;
  comments?: string;
  needs?: string;
  email: string;
  fullname: string;
  id?: number;
  phone: string;
  status: string;
  partner?: string;
  user?: {
    id: number;
    username: string;
  };
}

const initialState = {
  applicationStatus: APP_NOT_FOUND,
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

export const loginReducer = (state: ILoginState = initialState, action: AnyAction): ILoginState => {
  const { type, payload } = action;
  switch (type) {
    case SET_USER_DATA: {
      return {
        ...state,
        applicationStatus: payload.status,
        comments: payload.comments,
        email: payload.email,
        fullname: payload.fullname,
        id: payload.id,
        needs: payload.needs,
        partner: payload.partnerApplication.user.username,
        phone: payload.phone,
        status: payload.masterStatus,
        user: payload.user,
      };
    }
    default:
      return state;
  }
};
