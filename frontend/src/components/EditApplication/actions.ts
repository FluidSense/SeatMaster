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

export const updateSingleApplication = (id: number, application: IApplication):
  ThunkAction<Promise<void>, {}, {}, AnyAction> => async (dispatch: Dispatch) => {
    const applicationForm: IPostAdminApplicationForm = {
      comments: application.comments,
      masterStatus: application.user ? application.user.masterStatus : '',
      needs: application.needs,
      preferredRoom: application.preferredRoom,
      // TODO: Add partnerUsername
    };
    const result = await putAdminApplicationForm(id, applicationForm);
    if (result) dispatch(successfullAppUpdate());
    else dispatch(faultyAppUpdate());
  };
