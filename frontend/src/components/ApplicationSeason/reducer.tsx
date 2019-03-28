import moment, { Moment } from 'moment';
import { AnyAction } from 'redux';
import {
  RESET_SUBMIT,
  SET_APPLICATION_SEASON,
  SUBMITTED_APPLICATION_SEASON,
  SUBMITTED_APPLICATION_SEASON_FAILED,
  UPDATE_APPLICATION_SEASON,
} from './constants';

export interface IApplicationSeason {
  applicationPeriodEnd: Moment;
  applicationPeriodStart: Moment;
  start: Moment;
  end: Moment;
}

export interface IApplicationSeasonState {
  currentSeason?: IApplicationSeason;
  submitted?: boolean;
  id: number;
}

export const initialState = {
  currentSeason: undefined,
  id: 0,
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
          start: moment(payload.start),
        },
        id: payload.id,
      };
    case SUBMITTED_APPLICATION_SEASON:
      return {
        ...state,
        currentSeason: {
          applicationPeriodEnd: moment(payload.applicationPeriodEnd),
          applicationPeriodStart: moment(payload.applicationPeriodStart),
          end: moment(payload.end),
          start: moment(payload.start),
        },
        id: payload.id,
        submitted: true,
      };
    case SUBMITTED_APPLICATION_SEASON_FAILED:
      return {
        ...state,
        submitted: false,
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
