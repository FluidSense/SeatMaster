import { AnyAction, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

export const fetchUserData = (idToken: string):
ThunkAction<Promise<void>, {}, {}, AnyAction> => async (dispatch: Dispatch) => {
  fetch('http://localhost:5000/user/', {
    headers: {
      'Authorization': `Bearer ${idToken}`,
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
