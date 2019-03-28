import moment, { Moment } from 'moment';
import { AnyAction } from 'redux';
import {
  RESET_SUBMIT,
  SET_APPLICATION_SEASON,
  SUBMITTED_APPLICATION_SEASON,
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
      const {
        applicationPeriodEnd,
        applicationPeriodStart,
        start,
        end,
      } = payload;
      return {
        ...state,
        currentSeason: {
          applicationPeriodEnd: moment(applicationPeriodEnd),
          applicationPeriodStart: moment(applicationPeriodStart),
          end: moment(end),
          start: moment(start),
        },
        id: payload.id,
      };
    case SUBMITTED_APPLICATION_SEASON:
      return {
        ...state,
        submitted: payload,
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
