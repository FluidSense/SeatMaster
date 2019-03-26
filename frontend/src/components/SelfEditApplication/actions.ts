import { AnyAction, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { putApplicationForm } from '../../API/calls';
import { IPostApplicationForm } from '../../API/interfaces';
import { faultyAppUpdate, resetAppStatus, successfullAppUpdate } from '../EditApplication/actions';

export const updateSelfApplication = (application: IPostApplicationForm):
  ThunkAction<Promise<void>, {}, {}, AnyAction> => async (dispatch: Dispatch) => {
    dispatch(resetAppStatus());
    if (!application) {
      dispatch(successfullAppUpdate());
      return;
    }
    const result = await putApplicationForm(application);
    if (result) dispatch(successfullAppUpdate());
    else dispatch(faultyAppUpdate());
  };
