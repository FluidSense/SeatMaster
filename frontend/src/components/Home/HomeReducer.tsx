import { SET_APPLICATION_SEASON } from './Strings';

export interface IHomeState {
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

export const homeReducer = (
  state: IHomeState = initialState,
  action: any,
  ): IHomeState => {
  const { type, payload } = action;
  switch (type) {
    case SET_APPLICATION_SEASON: {
      return { ...state, applicationSeason: payload };
    }
    default:
      return state;
  }
};
