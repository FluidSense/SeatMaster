import { AnyAction, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { getAllApplications } from '../../API/calls';
import { IApplication } from '../Application';
import {
  FAILED_TO_RETRIEVE_ALL_APPLICATIONS,
  GET_ALL_APPLICATIONS,
} from './constants';

const retrievedApplications = (payload: IApplication[]) => ({
  payload,
  type: GET_ALL_APPLICATIONS,
});

const failedToRetrieveApplications = () => ({ type: FAILED_TO_RETRIEVE_ALL_APPLICATIONS });

const retrievedApplication = (payload: IApplication) => ({
  payload,
  type: FETCH_APPLICATION_DIRECTLY,
});

export const fetchAllApplications = ():
  ThunkAction<Promise<void>, {}, {}, AnyAction> => async (dispatch: Dispatch) => {
    const applications = await getAllApplications();
    if (applications) dispatch(retrievedApplications(applications));
    else dispatch(failedToRetrieveApplications());
  };

export const fetchApplicationDirectly = (id: number):
ThunkAction<Promise<void>, {}, {}, AnyAction> => async (dispatch: Dispatch) => {
  const application = await getApplicationFormById(id);
  if (application) dispatch(retrievedApplication(application));
};
