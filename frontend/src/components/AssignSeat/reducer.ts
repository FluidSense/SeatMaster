import { AnyAction } from 'redux';
import { IApplication } from './../../API/interfaces';
import { GET_ALL_APPLICATIONS } from './constants';

export interface IApplicationState {
  applications: IApplication[];
}

export const ApplicationReducer = (
  state: IApplicationState,
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
