import { AnyAction, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { getAllSeasons } from '../../API/calls';
import { IApplicationSeason } from '../ApplicationSeason/reducer';
import { FETCHED_APPLICATION_SEASONS } from './constants';

export const retrievedSeasons = (payload: IApplicationSeason[]) => ({
  payload,
  type: FETCHED_APPLICATION_SEASONS,
});

export const fetchAllSeasons = ():
  ThunkAction<Promise<void>, {}, {}, AnyAction> => async (dispatch: Dispatch) => {
    const result = await getAllSeasons();
    if (result) dispatch(retrievedSeasons(result));
  };
