import { AnyAction, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { getApplicationFormBySelf } from '../../API/calls';
import { IApplication } from '../Application';

const setApplicationData = (payload: IApplication) => ({
  payload,
  type: 'SET_APPLICATION_DATA',
});

const removeApplicationData = () => ({
  type: 'REMOVE_APPLICATION_DATA',
});

export const fetchApplicationInformation = ():
  ThunkAction<Promise<void>, {}, {}, AnyAction> => async (dispatch: Dispatch) => {
    const result = await getApplicationFormBySelf();
    (Object.keys(result).length > 0) ?
      dispatch(setApplicationData(result)) : dispatch(removeApplicationData());
  };
