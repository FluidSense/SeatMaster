import { AnyAction, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { SEASON_API_URL, SET_APPLICATION_SEASON } from './constants';

const setApplicationSeason = (payload: object) => ({payload, type: SET_APPLICATION_SEASON });

export const fetchApplicationSeasonData = ():
  ThunkAction<Promise<AnyAction>, {}, {}, AnyAction> => async (dispatch: Dispatch) => {
    return fetch(`${SEASON_API_URL}getSeason`)
      .then(response => response.json())
      .then(response => !Object.keys(response).length ? Promise.reject() : response)
      .then(result => dispatch(setApplicationSeason(result)));
  };
