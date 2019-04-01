import moment from 'moment';
import { AnyAction } from 'redux';
import { IApplicationSeason } from '../ApplicationSeason/reducer';
import {
  FETCHED_APPLICATION_SEASONS,
  FETCHING_APPLICATION_SEASONS,
} from './constants';

export interface ISeasonsState {
  fetching: string;
  seasons: IApplicationSeason[];
}

const initialState = {
  fetching: FETCHING_APPLICATION_SEASONS,
  seasons: [],
};

export const parseSeason = (season: IApplicationSeason) => ({
  applicationPeriodEnd: moment(season.applicationPeriodEnd),
  applicationPeriodStart: moment(season.applicationPeriodStart),
  end: moment(season.end),
  id: season.id,
  start: moment(season.start),
});

const parseSeasons = (seaons: IApplicationSeason[]) => seaons.map(season => parseSeason(season));

const SeasonsReducer = (
  state: ISeasonsState = initialState,
  action: AnyAction,
): ISeasonsState => {
  const { type, payload } = action;
  switch (type) {
    case FETCHED_APPLICATION_SEASONS:
      return {
        ...state,
        fetching: FETCHED_APPLICATION_SEASONS,
        seasons: parseSeasons(payload).reverse(),
      };
    default:
      return state;
  }
};

export default SeasonsReducer;
