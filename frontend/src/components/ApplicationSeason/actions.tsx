import { AnyAction, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { SEASON_API_URL, SET_APPLICATION_SEASON } from './constants';

export const fetchApplicationSeasonData = ():
  ThunkAction<Promise<any>, {}, {}, AnyAction> => async (dispatch: Dispatch) => {
    return fetch(`${SEASON_API_URL}getSeason`)
      .then(response => response.json())
      .then(response => !Object.keys(response).length ? Promise.reject() : response)
      .then(result => dispatch({
        payload: result,
        type: SET_APPLICATION_SEASON,
      }));
  };
