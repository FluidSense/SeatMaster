import { Moment } from 'moment';
import { AnyAction } from 'redux';
import { parseSeason } from '../ViewApplicationSeasons/reducer';
import {
  FETCHED_APPLICATION_SEASON,
  RESET_SUBMIT,
  SET_APPLICATION_SEASON,
  SUBMITTED_APPLICATION_SEASON,
  SUBMITTED_APPLICATION_SEASON_FAILED,
  UPDATE_APPLICATION_SEASON,
} from './constants';

export interface IApplicationSeason {
  applicationPeriodEnd: Moment;
  applicationPeriodStart: Moment;
  id: number;
  start: Moment;
  end: Moment;
}

export interface IApplicationSeasonState {
  currentSeason?: IApplicationSeason;
  submitted?: boolean;
}

export const initialState = {
  currentSeason: undefined,
};

export const applicationSeasonReducer = (
  state: IApplicationSeasonState = initialState,
  action: AnyAction,
): IApplicationSeasonState => {
  const { type, payload } = action;
  switch (type) {
    case SET_APPLICATION_SEASON:
      return {
        ...state,
        currentSeason: parseSeason(payload),
      };
    case SUBMITTED_APPLICATION_SEASON:
      return {
        ...state,
        currentSeason: parseSeason(payload),
        submitted: true,
      };
    case SUBMITTED_APPLICATION_SEASON_FAILED:
      return {
        ...state,
        submitted: false,
      };
    case FETCHED_APPLICATION_SEASON:
      return {
        ...state,
        currentSeason: parseSeason(payload),
      };
    case UPDATE_APPLICATION_SEASON:
      return {
        ...state,
        submitted: payload,
      };
    case RESET_SUBMIT:
      return {
        ...state,
        submitted: undefined,
      };
    default:
      return state;
  }
};
