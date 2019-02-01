import { SET_USER_DATA } from './Strings';

export interface ILoginState {
  comments: string | null;
  id: number | null;
  status: string | null;
  user: {
    id: number;
    username: string;
  } | null;
}

const initialState = {
  comments: null,
  id: null,
  status: null,
  user: null,
};

export const loginReducer = (
  state: ILoginState = initialState,
  action: any,
  ): ILoginState => {
  const { type, payload } = action;
  switch (type) {
    case SET_USER_DATA: {
      return payload;
    }
    default:
      return state;
  }
};
