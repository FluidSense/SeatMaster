import moment, { Moment } from 'moment';
import { AnyAction } from 'redux';
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
        currentSeason: {
          applicationPeriodEnd: moment(payload.applicationPeriodEnd),
          applicationPeriodStart: moment(payload.applicationPeriodStart),
          end: moment(payload.end),
          id: payload.id,
          start: moment(payload.start),
        },
      };
    case SUBMITTED_APPLICATION_SEASON:
      return {
        ...state,
        currentSeason: {
          applicationPeriodEnd: moment(payload.applicationPeriodEnd),
          applicationPeriodStart: moment(payload.applicationPeriodStart),
          end: moment(payload.end),
          id: payload.id,
          start: moment(payload.start),
        },
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
        currentSeason: {
          applicationPeriodEnd: moment(payload.applicationPeriodEnd),
          applicationPeriodStart: moment(payload.applicationPeriodStart),
          end: moment(payload.end),
          id: payload.id,
          start: moment(payload.start),
        },
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
