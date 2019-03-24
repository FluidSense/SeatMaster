import { AnyAction, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { putAdminApplicationForm } from '../../API/calls';
import { IPostAdminApplicationForm } from '../../API/interfaces';
import { IApplication } from '../Application';
import { SUCCESSFULL_APPLICATION_UPDATE, UNSUCCESSFULL_APPLICATION_UPDATE } from './constants';

const successfullAppUpdate = () => ({
  type: SUCCESSFULL_APPLICATION_UPDATE,
});

const faultyAppUpdate = () => ({
  type: UNSUCCESSFULL_APPLICATION_UPDATE,
});

export const updateSingleApplication = (id: number, application: IPostAdminApplicationForm):
  ThunkAction<Promise<void>, {}, {}, AnyAction> => async (dispatch: Dispatch) => {
    const result = await putAdminApplicationForm(id, application);
    if (result) dispatch(successfullAppUpdate());
    else dispatch(faultyAppUpdate());
  };
