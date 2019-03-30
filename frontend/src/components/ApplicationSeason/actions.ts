import { AnyAction, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { getSeason, getSeasonFromId } from '../../API/calls';
import isEmpty from '../../utils/objectIsEmpty';
import { FETCHED_APPLICATION_SEASON, SET_APPLICATION_SEASON } from './constants';
import { IApplicationSeason } from './reducer';

const setApplicationSeason = (payload: IApplicationSeason) => ({
  payload,
  type: SET_APPLICATION_SEASON,
});

const fetchedApplicationSeason = (payload: IApplicationSeason) => ({
  payload,
  type: FETCHED_APPLICATION_SEASON,
});

export const fetchApplicationSeasonData = ():
  ThunkAction<Promise<void>, {}, {}, AnyAction> => async (dispatch: Dispatch) => {
    const result = await getSeason();
    if (result && !isEmpty(result)) dispatch(setApplicationSeason(result));
  };

export const fetchSeasonById = (id: number):
ThunkAction<Promise<void>, {}, {}, AnyAction> => async (dispatch: Dispatch) => {
  const result = await getSeasonFromId(id);
  if (result && !isEmpty(result)) dispatch(fetchedApplicationSeason(result));
};
