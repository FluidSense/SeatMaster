import { AnyAction } from 'redux';

export interface IRegisteredApplicationState {
  comments?: string;
  id?: number;
  needs?: string;
  partnerApplication?: {
    id?: number;
    user?: {
      email?: string;
      id?: number;
      username?: string;
    };
  };
  preferredRoom?: string;
  seatRollover?: boolean;
  status: string;
  user?: {
    email?: string;
    id?: number;
    username?: string;
  };
}

const initialState = {
  comments: undefined,
  id: undefined,
  needs: undefined,
  partnerApplication: {
    id: undefined,
    user: {
      email: undefined,
      id: undefined,
      username: undefined,
    },
  },
  preferredRoom: undefined,
  seatRollover: undefined,
  status: '_APP_NOT_FOUND',
  user: {
    email: undefined,
    id: undefined,
    username: undefined,
  },
};

export const registeredApplicationReducer = (
    state: IRegisteredApplicationState = initialState, action: AnyAction,
  ): IRegisteredApplicationState => {
  const { type, payload } = action;
  switch (type) {
    case 'SET_APPLICATION_DATA': {
      return {
        ...state,
        comments: payload.comments,
        id: payload.id,
        needs: payload.needs,
        partnerApplication: {
          id: payload.partnerApplication.id,
          user: {
            email: payload.partnerApplication.user.email,
            id: payload.partnerApplication.user.id,
            username: payload.partnerApplication.user.username,
          },
        },
        preferredRoom: payload.preferredRoom,
        seatRollover: payload.seatRollover,
        status: payload.status,
        user: {
          email: payload.user.email,
          id: payload.user.id,
          username: payload.user.username,
        },
      };
    }
    case 'REMOVE_APPLICATION_DATA': {
      return {
        ...state,
        comments: undefined,
        id: undefined,
        needs: undefined,
        partnerApplication: {
          id: undefined,
          user: {
            email: undefined,
            id: undefined,
            username: undefined,
          },
        },
        preferredRoom: undefined,
        seatRollover: undefined,
        status: '_APP_NOT_FOUND',
        user: {
          email: undefined,
          id: undefined,
          username: undefined,
        },
      };
    }
    default:
      return state;
  }
};
