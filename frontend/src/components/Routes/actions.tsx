import { AnyAction, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { GET_USER_BY_NAME_URL } from '../commonConstants';

export const fetchUserData = (idToken: string):
ThunkAction<Promise<void>, {}, {}, AnyAction> => async (dispatch: Dispatch) => {
  await fetch(`${GET_USER_BY_NAME_URL}`, {
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  })
    .then(response => response.json())
    .then(result => dispatch({
      payload: result,
      type: 'SET_USER_DATA',
    }))
    .catch(error => dispatch({
      payload: error,
      type: 'REMOVE_USER_DATA',
    }));
};
