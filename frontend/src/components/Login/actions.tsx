import { AnyAction, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { SET_USER_DATA } from './constants';

export const fetchUserData = (userID: number):
  ThunkAction<Promise<void>, {}, {}, AnyAction> => async (dispatch: Dispatch) => {
    fetch(`http://localhost:5000/application/user/${userID}`)
      .then(response => response.json())
      .then(result => dispatch({
        payload: result,
        type: SET_USER_DATA,
      }));
  };
