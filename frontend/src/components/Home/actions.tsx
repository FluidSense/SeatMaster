import { AnyAction, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

export const fetchApplicationInformation = (idToken: string, username: string):
  ThunkAction<Promise<void>, {}, {}, AnyAction> => async (dispatch: Dispatch) => {
    fetch(`http://localhost:5000/application/byUser/${username}`, {
      headers: {
        'Authorization': `Bearer ${idToken}`,
        'Content-Type': 'application/json',
      },
      method: 'GET',
    })
      .then(response => response.json())
      .then(result => dispatch({
        payload: result,
        type: 'SET_APPLICATION_DATA',
      }))
      .catch(error => dispatch({
        payload: error,
        type: 'REMOVE_APPLICATION_DATA',
      }));
  };
