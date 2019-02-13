import { AnyAction, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { GET_APPLICATION_SEASON, SET_APPLICATION_SEASON } from './Strings';

export const fetchApplicationSeasonData = ():
  ThunkAction<Promise<void>, {}, {}, AnyAction> => async (dispatch: Dispatch) => {
    fetch(GET_APPLICATION_SEASON)
      .then(response => response.json())
      .then(result => dispatch({
        payload: result,
        type: SET_APPLICATION_SEASON,
      }));
  };
