import { AnyAction, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { getApplicationForm } from '../../API/calls';
import { SET_USER_DATA } from './constants';

export const fetchUserData = (userID: number):
  ThunkAction<Promise<AnyAction>, {}, {}, AnyAction> => async (dispatch: Dispatch) => {
    return getApplicationForm(userID)
      .then(result => dispatch({
        payload: result,
        type: SET_USER_DATA,
      }));
  };
