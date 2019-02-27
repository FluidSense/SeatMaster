import { AnyAction, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { getSeason } from '../../API/calls';
import { SET_APPLICATION_SEASON } from './constants';

const setApplicationSeason = (payload: object) => ({ payload, type: SET_APPLICATION_SEASON });

export const fetchApplicationSeasonData = ():
  ThunkAction<Promise<AnyAction>, {}, {}, AnyAction> => async (dispatch: Dispatch) => {
    return getSeason()
      .then(response => !Object.keys(response).length ? Promise.reject() : response)
      .then(result => dispatch(setApplicationSeason(result)));
  };
