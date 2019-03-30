import { AnyAction, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import {
  getAllApplications,
  postAdminApplicationApproveList,
  postAdminApplicationWaitingList,
} from '../../API/calls';
import { IApplication } from '../Application';
import {
  APPROVE_ALL_APPLICATIONS,
  FAILED_TO_RETRIEVE_ALL_APPLICATIONS,
  GET_ALL_APPLICATIONS,
  WAITING_LIST_ALL_APPLICAITONS,
} from './constants';

const retrievedApplications = (payload: IApplication[]) => ({
  payload,
  type: GET_ALL_APPLICATIONS,
});

const approvedAllApplications = (payload: IApplication[]) => ({
  payload,
  type: APPROVE_ALL_APPLICATIONS,
});

const waitAllApplications = (payload: IApplication[]) => ({
  payload,
  type: WAITING_LIST_ALL_APPLICAITONS,
});

const failedToRetrieveApplications = () => ({ type: FAILED_TO_RETRIEVE_ALL_APPLICATIONS });

export const approveAllApplications = (ids: number[]):
  ThunkAction<Promise<void>, {}, {}, AnyAction> => async (dispatch: Dispatch) => {
    const result = await postAdminApplicationApproveList(ids);
    if (result) {
      dispatch(approvedAllApplications(result));
    }
  };

export const waitingListAllApplications = (ids: number[]):
  ThunkAction<Promise<void>, {}, {}, AnyAction> => async (dispatch: Dispatch) => {
    const result = await postAdminApplicationWaitingList(ids);
    if (result) {
      dispatch(waitAllApplications(result));
    }
  };

export const fetchAllApplications = ():
  ThunkAction<Promise<void>, {}, {}, AnyAction> => async (dispatch: Dispatch) => {
    const applications = await getAllApplications();
    if (applications) dispatch(retrievedApplications(applications));
    else dispatch(failedToRetrieveApplications());
  };
