import { AnyAction } from 'redux';
import { IApplication } from '../Application';
import {
  FETCH_APPLICATION_DIRECTLY,
  FETCH_APPLICATION_DIRECTLY_FAILED,
  RESET_REVIEW_APPLICATION_STATUS_CODE,
} from './constants';

export interface IAdminReviewApplicationState {
  application?: IApplication;
  api: {
    status: number,
  };
}

const initialState: IAdminReviewApplicationState = {
  api: {
    status: 0,
  },
  application: undefined,
};

export const AdminReviewApplicationReducer = (
  state: IAdminReviewApplicationState = initialState,
  action: AnyAction,
): IAdminReviewApplicationState => {
  switch (action.type) {
    case FETCH_APPLICATION_DIRECTLY: {
      return {
        ...state,
        api: {
          status: 200,
        },
        application: action.payload,
      };
    }
    case FETCH_APPLICATION_DIRECTLY_FAILED: {
      return {
        ...state,
        api: {
          status: 404,
        },
        application: initialState.application,
      };
    }
    case RESET_REVIEW_APPLICATION_STATUS_CODE: {
      return {
        ...state,
        api: initialState.api,
      };
    }
    default:
      return { ...state };
  }
};
