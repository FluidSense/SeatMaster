import { AnyAction } from 'redux';
import { SET_APPLICATION_SEASON } from './constants';

export interface IApplicationSeason {
  applicationPeriodEnd: Date;
  applicationPeriodStart: Date;
  start: Date;
  end: Date;
}

const minDate = new Date(1970);

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
        applicationPeriodEnd: new Date(applicationPeriodEnd),
        applicationPeriodStart: new Date(applicationPeriodStart),
        end: new Date(end),
        start: new Date(start),
      };
    default:
      return state;
  }
};
