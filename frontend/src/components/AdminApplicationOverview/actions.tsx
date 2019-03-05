import { AnyAction, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { getAllApplications, getAllRooms } from '../../API/calls';
import { IApplication } from '../../API/interfaces';
import { FAILED_TO_RETRIEVE_ALL_APPLICATIONS, GET_ALL_APPLICATIONS } from './constants';

const retrievedApplications = (payload: IApplication[]) => ({
  payload,
  type: GET_ALL_APPLICATIONS,
});

const failedToRetrieveApplications = () => ({ type: FAILED_TO_RETRIEVE_ALL_APPLICATIONS });

export const fetchAllApplications = ():
  ThunkAction<Promise<void>, {}, {}, AnyAction> => async (dispatch: Dispatch) => {
    const applications = await getAllApplications();
    if (applications) dispatch(retrievedApplications(applications));
    else dispatch(failedToRetrieveApplications());
  };
