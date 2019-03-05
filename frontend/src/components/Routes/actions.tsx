import { AnyAction, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { getUserData } from '../../API/calls';
import { IUser } from '../../API/interfaces';

const setUserData = (payload: IUser) => ({
  payload,
  type: 'SET_USER_DATA',
});

const removeUserData = () => ({
  type: 'REMOVE_USER_DATA',
});

export const fetchUserData = ():
ThunkAction<Promise<void>, {}, {}, AnyAction> => async (dispatch: Dispatch) => {
  const result = await getUserData();
  (Object.keys(result).length > 0) ? dispatch(setUserData(result)) : dispatch(removeUserData());
};
