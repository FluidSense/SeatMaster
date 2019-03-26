import { AnyAction, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { getApplicationFormById } from '../../API/calls';
import { IApplication } from '../Application';
import {
  FETCH_APPLICATION_DIRECTLY,
  FETCH_APPLICATION_DIRECTLY_FAILED,
} from './constants';

const retrievedApplication = (payload: IApplication) => ({
  payload,
  type: FETCH_APPLICATION_DIRECTLY,
});

const retrievedApplicationFailed = () => ({
  type: FETCH_APPLICATION_DIRECTLY_FAILED,
});

export const fetchApplicationDirectly = (id: number):
ThunkAction<Promise<void>, {}, {}, AnyAction> => async (dispatch: Dispatch) => {
  const application = await getApplicationFormById(id);
  if (application) dispatch(retrievedApplication(application));
  else dispatch(retrievedApplicationFailed());
};
