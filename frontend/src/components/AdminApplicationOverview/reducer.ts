import { AnyAction } from 'redux';
import { IApplication } from '../Application';
import { APP_NOT_FOUND } from '../commonConstants';
import { GET_ALL_APPLICATIONS } from './constants';

export interface IApplicationState {
  applications: IApplication[];
  registeredApplication: IApplication;
}

const initialState: IApplicationState = {
  applications: [],
  registeredApplication: {
    status: APP_NOT_FOUND,
  },
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
    case 'SET_APPLICATION_DATA': {
      return {
        ...state,
        registeredApplication: action.payload,
      };
    }
    case 'REMOVE_APPLICATION_DATA': {
      return {
        ...state,
        registeredApplication: initialState.registeredApplication,
      };
    }
    default:
      return { ...state };
  }
};
