import { AnyAction } from 'redux';
import { IRegisteredApplicationState } from './../Home/reducer';
import { GET_ALL_APPLICATIONS } from './constants';

export interface IApplicationState {
  applications: IRegisteredApplicationState[];
}

const initialState: IApplicationState = {
  applications: [],
};

export const ApplicationReducer = (
  state: IApplicationState = initialState,
  action: AnyAction,
): IApplicationState => {
  switch (action.type) {
    case GET_ALL_APPLICATIONS:
      const applications = action.payload;
      return {
        ...state,
        applications,
      };
    default:
      return { ...state };
  }
};
