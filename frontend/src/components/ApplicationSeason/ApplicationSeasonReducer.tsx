import { SET_APPLICATION_SEASON } from './Strings';

export interface IApplicationSeasonState {
  applicationSeason?: {
    applicationPeriodEnd: string;
    applicationPeriodStart: string;
    start: string;
    end: string;
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
    case SET_APPLICATION_SEASON: {
      return { ...state, applicationSeason: payload };
    }
    default:
      return state;
  }
};
