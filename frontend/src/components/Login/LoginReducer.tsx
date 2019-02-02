import { ACTION_NONE, SET_USER_DATA } from './Strings';

export interface ILoginState {
  comments?: string;
  id?: number;
  status: string;
  user?: {
    id: number;
    username: string;
  };
}

const initialState = {
  comments: undefined,
  id: undefined,
  status: ACTION_NONE,
  user: undefined,
};

export const loginReducer = (
  state: ILoginState = initialState,
  action: any,
  ): ILoginState => {
  const { type, payload } = action;
  switch (type) {
    case SET_USER_DATA: {
      return {
        ...state,
        comments: payload.comments,
        id: payload.id,
        status: payload.status,
        user: payload.user,
      };
    }
    default:
      return state;
  }
};
