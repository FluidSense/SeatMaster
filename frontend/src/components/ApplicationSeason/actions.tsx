import { AnyAction, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { SEASON_API_URL, SET_APPLICATION_SEASON } from './constants';

export const fetchApplicationSeasonData = ():
  ThunkAction<Promise<void>, {}, {}, AnyAction> => async (dispatch: Dispatch) => {
    fetch(`${SEASON_API_URL}getSeason`)
      .then(response => response.json())
      .then(result => dispatch({
        payload: result,
        type: SET_APPLICATION_SEASON,
      }));
  };
