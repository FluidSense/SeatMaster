import { AnyAction, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { putAdminApplicationForm } from '../../API/calls';
import { IPostAdminApplicationForm } from '../../API/interfaces';
import {
  RESET_APPLICATION_STATUS,
  SUCCESSFULL_APPLICATION_UPDATE,
  UNSUCCESSFULL_APPLICATION_UPDATE,
} from './constants';

const successfullAppUpdate = () => ({
  type: SUCCESSFULL_APPLICATION_UPDATE,
});

const faultyAppUpdate = () => ({
  type: UNSUCCESSFULL_APPLICATION_UPDATE,
});

export const resetAppStatus = () => ({
  type: RESET_APPLICATION_STATUS,
});

export const updateSingleApplication = (id: number, application: IPostAdminApplicationForm):
  ThunkAction<Promise<void>, {}, {}, AnyAction> => async (dispatch: Dispatch) => {
    dispatch(resetAppStatus());
    if (!application) return;
    const result = await putAdminApplicationForm(id, application);
    if (result) dispatch(successfullAppUpdate());
    else dispatch(faultyAppUpdate());
  };
