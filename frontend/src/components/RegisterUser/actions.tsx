import { AnyAction, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { POST_NEW_USER_URL } from '../commonConstants';

export const postCreateUser = (profile: string):
  ThunkAction<Promise<void>, {}, {}, AnyAction> => async (dispatch: Dispatch) => {
    fetch(`${POST_NEW_USER_URL}${profile}`)
      .then(response => response.json())
      .then(result => dispatch({
        payload: result,
        type: 'SET_USER_DATA',
      }));
  };
