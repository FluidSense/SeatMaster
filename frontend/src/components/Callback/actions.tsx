import { AnyAction, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { GET_USER_BY_NAME_URL } from '../commonConstants';

export const fetchUserRegistered = (feideId: string):
  ThunkAction<Promise<void>, {}, {}, AnyAction> => async (dispatch: Dispatch) => {
    fetch(`${GET_USER_BY_NAME_URL}${feideId}`)
      .then(response => response.json())
      .then(result => dispatch({
        payload: result,
        type: 'SET_USER_DATA',
      }));
  };
