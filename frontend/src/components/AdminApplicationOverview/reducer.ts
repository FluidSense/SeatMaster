import { AnyAction } from 'redux';
import { IUser } from '../../API/interfaces';
import { IApplication } from '../Application';
import {
  RESET_APPLICATION_STATUS,
  SUCCESSFULL_APPLICATION_UPDATE,
  UNSUCCESSFULL_APPLICATION_UPDATE,
} from '../EditApplication/constants';
import {
  APPROVE_ALL_APPLICATIONS,
  FETCHED_APPLICATION_DATA,
  FETCHING_APPLICATION_DATA,
  GET_ALL_APPLICATIONS,
  REMOVE_APPLICATION_DATA,
  SET_APPLICATION_DATA,
} from './constants';

export interface IApplicationState {
  applications: IApplication[];
  fetchingApplications: string;
  registeredApplication?: IApplication;
  api: {
    status: number,
  };
}

export const initUser: IUser = {
  admin: false,
  email: '',
  fullname: '',
  id: 0,
  username: '',
};

const initialState: IApplicationState = {
  api: {
    status: 0,
  },
  applications: [],
  fetchingApplications: FETCHING_APPLICATION_DATA,
  registeredApplication: {
    id: 0,
    rank: 'OTHER',
    status: FETCHING_APPLICATION_DATA,
    user: initUser,
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
        applications: Object.values(applications),
        fetchingApplications: FETCHED_APPLICATION_DATA,
      };
    case SET_APPLICATION_DATA: {
      return {
        ...state,
        registeredApplication: action.payload,
      };
    }
    case REMOVE_APPLICATION_DATA: {
      return {
        ...state,
        registeredApplication: undefined,
      };
    }
    case SUCCESSFULL_APPLICATION_UPDATE: {
      return {
        ...state,
        api: {
          ...state.api,
          status: 200,
        },
      };
    }
    case UNSUCCESSFULL_APPLICATION_UPDATE: {
      return {
        ...state,
        api: {
          ...state.api,
          status: 400,
        },
      };
    }
    case RESET_APPLICATION_STATUS: {
      return {
        ...state,
        api: {
          ...state.api,
          status: 0,
        },
      };
    }
    case APPROVE_ALL_APPLICATIONS: {
      const updatedApps = action.payload;
      return {
        ...state,
        applications: state.applications.map((app: IApplication) => {
          return updatedApps.find((newApp: IApplication) => app.id === newApp.id) || app;
        }),
      };
    }
    default:
      return { ...state };
  }
};
