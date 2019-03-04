import { AnyAction } from 'redux';
import { IApplication } from './../../API/interfaces';
import { GET_ALL_APPLICATIONS } from './constants';

export interface IApplicationState {
  applications: IApplication[];
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
