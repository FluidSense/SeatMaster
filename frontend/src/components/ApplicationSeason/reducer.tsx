import moment, { Moment } from 'moment';
import { AnyAction } from 'redux';
import { SET_APPLICATION_SEASON } from './constants';

export interface IApplicationSeason {
  applicationPeriodEnd: Moment;
  applicationPeriodStart: Moment;
  start: Moment;
  end: Moment;
}

const minDate = moment(1970);

export const initialState = {
  applicationPeriodEnd: minDate,
  applicationPeriodStart: minDate,
  end: minDate,
  start: minDate,
};

export const applicationSeasonReducer = (
  state: IApplicationSeason = initialState,
  action: AnyAction,
): IApplicationSeason => {
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
        applicationPeriodEnd: moment(applicationPeriodEnd),
        applicationPeriodStart: moment(applicationPeriodStart),
        end: moment(end),
        start: moment(start),
      };
    default:
      return state;
  }
};
