import { AnyAction } from 'redux';
import { IApplication } from '../Application';
import { APP_NOT_FOUND } from '../commonConstants';
import {
  RESET_APPLICATION_STATUS,
  SUCCESSFULL_APPLICATION_UPDATE,
  UNSUCCESSFULL_APPLICATION_UPDATE,
} from '../EditApplication/constants';
import {
  FETCHED_APPLICATION_DATA,
  FETCHING_APPLICATION_DATA,
  GET_ALL_APPLICATIONS,
  REMOVE_APPLICATION_DATA,
  SET_APPLICATION_DATA,
} from './constants';
import { IUser } from '../../API/interfaces';

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
        applications,
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
        registeredApplication: { status: APP_NOT_FOUND },
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
    default:
      return { ...state };
  }
};
