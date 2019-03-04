import { AnyAction, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { POST_NEW_USER_URL } from '../commonConstants';

export const postCreateUser = (idToken: string, accessToken: string):
  ThunkAction<Promise<void>, {}, {}, AnyAction> => async (dispatch: Dispatch) => {
    await fetch(`${POST_NEW_USER_URL}`, {
      body: JSON.stringify({
        accessToken: `${accessToken}`,
      }),
      headers: {
        Authorization: `Bearer ${idToken}`,
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })
      .then(response => response.json())
      .then(result => dispatch({
        payload: result,
        type: 'SET_USER_DATA',
      }))
      .catch((error) => {
        throw new Error(error);
      });
  };
