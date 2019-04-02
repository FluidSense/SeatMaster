import { AnyAction } from 'redux';
import { IUser } from '../../API/interfaces';
import { IApplication } from '../Application';
import {
  NO_CHANGE_IN_APPLICATION_AFTER_UPDATE,
  RESET_APPLICATION_STATUS,
  SUCCESSFULL_APPLICATION_UPDATE,
  UNSUCCESSFULL_APPLICATION_UPDATE,
} from '../EditApplication/constants';
import { ISeat } from '../Seats';
import {
  REMOVE_STUDENT_SUCCESS,
  SUCCESSFULL_SEAT_ASSIGNMENT,
} from './../AssignSeat/constants';
import {
  APPROVE_ALL_APPLICATIONS,
  FETCHED_APPLICATION_DATA,
  FETCHING_APPLICATION_DATA,
  GET_ALL_APPLICATIONS,
  REMOVE_APPLICATION_DATA,
  REMOVE_APPROVED_FROM_SEAT,
  SET_APPLICATION_DATA,
  WAITING_LIST_ALL_APPLICAITONS,
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
      const application = action.payload;
      const registered = state.registeredApplication;
      return {
        ...state,
        api: {
          ...state.api,
          status: 200,
        },
        applications: state.applications.map(app => app.id === application.id ? application : app),
        registeredApplication: registered && registered.id === application.id
          ? application
          : registered,
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
    case NO_CHANGE_IN_APPLICATION_AFTER_UPDATE: {
      return {
        ...state,
        api: {
          ...state.api,
          status: 200,
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
    case WAITING_LIST_ALL_APPLICAITONS: {
      const updatedApps = action.payload;
      return {
        ...state,
        applications: state.applications.map((app: IApplication) => {
          return updatedApps.find((newApp: IApplication) => app.id === newApp.id) || app;
        }),
      };
    }
    case SUCCESSFULL_SEAT_ASSIGNMENT: {
      const newSeat: ISeat = action.payload;
      const user = newSeat.user;
      if (user) {
        const mutableSeat = { ...newSeat, user: undefined };
        const application = state.applications.find(app => app.user.id === user.id);
        if (application) {
          const updatedApplication = { ...application, seat: mutableSeat };
          return {
            ...state,
            applications: state.applications.map((app: IApplication) => {
              return app.id === updatedApplication.id ? updatedApplication : app;
            }),
          };
        }
        return { ...state };
      }
      return { ...state };
    }
    case REMOVE_STUDENT_SUCCESS: {
      const seat: ISeat = action.payload;
      const application = state.applications.find((app: IApplication) => {
        return app.seat ? app.seat.id === seat.id : false;
      });
      if (application) {
        const updatedApplication = { ...application, seat: undefined };
        return {
          ...state,
          applications: state.applications.map((app: IApplication) => {
            return app.id === updatedApplication.id ? updatedApplication : app;
          }),
        };
      }
      return { ...state };
    }
    case REMOVE_APPROVED_FROM_SEAT: {
      return {
        ...state,
        applications: state.applications.map(app => app.seat ? { ...app, seat: undefined } : app),
      };
    }
    default:
      return { ...state };
  }
};
