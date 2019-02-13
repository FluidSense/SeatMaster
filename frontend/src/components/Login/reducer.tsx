import { AnyAction } from 'redux';
import { APP_NOT_FOUND, SET_USER_DATA } from './constants';

export interface ILoginState {
  applicationStatus: string;
  comments?: string;
  id?: number;
  user?: {
    id: number;
    username: string;
  };
}

const initialState = {
  applicationStatus: APP_NOT_FOUND,
  comments: undefined,
  id: undefined,
  user: undefined,
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
        applicationStatus: payload.applicationStatus,
        comments: payload.comments,
        id: payload.id,
        user: payload.user,
      };
    }
    default:
      return state;
  }
};
