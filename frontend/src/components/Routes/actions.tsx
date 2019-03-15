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

const loadUserData = () => ({
  type: 'LOAD_USER_DATA',
});

export const fetchUserData = ():
ThunkAction<Promise<void>, {}, {}, AnyAction> => async (dispatch: Dispatch) => {
  dispatch(loadUserData());
  const result = await getUserData();
  (Object.keys(result).length > 0 && instanceOfA(result))
  ?
  dispatch(setUserData(result)) : dispatch(removeUserData());
};

function instanceOfA(object: any): object is IUser {
  return 'id' in object;
}
