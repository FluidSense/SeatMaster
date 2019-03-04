import { AnyAction, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { getSeason } from '../../API/calls';
import { SET_APPLICATION_SEASON } from './constants';
import { IApplicationSeason } from './reducer';

const setApplicationSeason = (payload: IApplicationSeason) => ({
  payload,
  type: SET_APPLICATION_SEASON,
});

export const fetchApplicationSeasonData = ():
  ThunkAction<Promise<void>, {}, {}, AnyAction> => async (dispatch: Dispatch) => {
    const result = await getSeason();
    if (result) dispatch(setApplicationSeason(result));
  };
