import { SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION } from 'constants';
import { AnyAction } from 'redux';
import { IApplication } from '../Application';
import { APP_NOT_FOUND } from '../commonConstants';
import {
  RESET_APPLICATION_STATUS,
  SUCCESSFULL_APPLICATION_UPDATE,
  UNSUCCESSFULL_APPLICATION_UPDATE,
} from '../EditApplication/constants';
import {
  FETCH_APPLICATION_DIRECTLY,
  GET_ALL_APPLICATIONS,
  REMOVE_APPLICATION_DATA,
  SET_APPLICATION_DATA,
} from './constants';

export interface IApplicationState {
  applications: IApplication[];
  fetchedApplication?: IApplication;
  registeredApplication: IApplication;
  api: {
    status: number,
  };
}

const initialState: IApplicationState = {
  api: {
    status: 0,
  },
  applications: [],
  fetchedApplication: undefined,
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
    case SET_APPLICATION_DATA: {
      return {
        ...state,
        registeredApplication: action.payload,
      };
    }
    case REMOVE_APPLICATION_DATA: {
      return {
        ...state,
        registeredApplication: initialState.registeredApplication,
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
    case FETCH_APPLICATION_DIRECTLY: {
      return {
        ...state,
        fetchedApplication: action.payload,
      };
    }
    default:
      return { ...state };
  }
};
