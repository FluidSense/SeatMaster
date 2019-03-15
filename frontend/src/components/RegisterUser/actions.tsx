import { AnyAction, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { postNewCreateUser } from '../../API/calls';
import { IUser } from '../../API/interfaces';

const setUserData = (payload: IUser) => ({
  payload,
  type: 'SET_USER_DATA',
});

export const postCreateUser = (accessToken: string):
  ThunkAction<Promise<void>, {}, {}, AnyAction> => async (dispatch: Dispatch) => {
    const result = await postNewCreateUser({ accessToken });
    if (result) dispatch(setUserData(result));
  };
