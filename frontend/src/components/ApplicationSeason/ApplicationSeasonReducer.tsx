import { SET_APPLICATION_SEASON } from './Strings';

export interface IApplicationSeasonState {
  applicationSeason?: {
    applicationPeriodEnd: Date;
    applicationPeriodStart: Date;
    start: Date;
    end: Date;
  };
}

export const initialState = {
  applicationSeason: undefined,
};

export const applicationSeasonReducer = (
  state: IApplicationSeasonState = initialState,
  action: any,
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
        applicationSeason: {
          applicationPeriodEnd: new Date(applicationPeriodEnd),
          applicationPeriodStart: new Date(applicationPeriodStart),
          end: new Date(end),
          start: new Date(start),
        },
      };
    default:
      return state;
  }
};
