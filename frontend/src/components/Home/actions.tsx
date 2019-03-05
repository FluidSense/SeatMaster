import { AnyAction, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { getApplicationForm } from '../../API/calls';
import { IApplicationForm } from '../../API/interfaces';

const setApplicationData = (payload: IApplicationForm) => ({
  payload,
  type: 'SET_APPLICATION_DATA',
});

const removeApplicationData = () => ({
  type: 'REMOVE_APPLICATION_DATA',
});

export const fetchApplicationInformation = (username: string):
ThunkAction<Promise<void>, {}, {}, AnyAction> => async (dispatch: Dispatch) => {
  const result = await getApplicationForm(username);
  (result) ? dispatch(setApplicationData(result)) : dispatch(removeApplicationData());
};
