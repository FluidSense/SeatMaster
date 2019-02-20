import { AnyAction, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { SEASON_API_URL, SET_APPLICATION_SEASON } from './constants';

export const fetchApplicationSeasonData = ():
  ThunkAction<Promise<void>, {}, {}, AnyAction> => async (dispatch: Dispatch) => {
    fetch(`${SEASON_API_URL}getSeason`)
      .then(response => { console.log('I am running!', response); return response; })
      .then(response => response.json())
      .then(response => { console.log('Now its JSON, right?', response); return response; })
     // .then(response => !Object.keys(response).length ? Promise.reject() : response)
      .then(result => dispatch({
        payload: result,
        type: SET_APPLICATION_SEASON,
      }))
      .then(dispatchreturn => { console.log('and this was returned from dispatch?', dispatchreturn); return dispatchreturn; });
  };
