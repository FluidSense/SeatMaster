import { AnyAction, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { putAdminApplicationForm } from '../../API/calls';
import { IPostAdminApplicationForm } from '../../API/interfaces';
import { IApplication } from '../Application';
import {
  NO_CHANGE_IN_APPLICATION_AFTER_UPDATE,
  RESET_APPLICATION_STATUS,
  SUCCESSFULL_APPLICATION_UPDATE,
  UNSUCCESSFULL_APPLICATION_UPDATE,
} from './constants';

export const successfullAppUpdate = (payload: IApplication) => ({
  payload,
  type: SUCCESSFULL_APPLICATION_UPDATE,
});

export const faultyAppUpdate = () => ({
  type: UNSUCCESSFULL_APPLICATION_UPDATE,
});

export const resetAppStatus = () => ({
  type: RESET_APPLICATION_STATUS,
});

export const noChangeInApp = () => ({
  type: NO_CHANGE_IN_APPLICATION_AFTER_UPDATE,
});

export const updateSingleApplication = (id: number, application: IPostAdminApplicationForm):
  ThunkAction<Promise<void>, {}, {}, AnyAction> => async (dispatch: Dispatch) => {
    dispatch(resetAppStatus());
    if (!application) {
      dispatch(noChangeInApp());
      return;
    }
    const result = await putAdminApplicationForm(id, application);
    if (result) dispatch(successfullAppUpdate(result));
    else dispatch(faultyAppUpdate());
  };
