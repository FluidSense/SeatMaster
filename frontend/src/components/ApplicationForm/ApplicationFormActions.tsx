import { AnyAction, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { ACTION_LIST } from './Strings';

export const sendApplicationFormData = ():
  ThunkAction<Promise<void>, {}, {}, AnyAction> => async (dispatch: Dispatch) => {
    // TODO: POST data to http://192.168.99.100:5000/application/registerApplication
  };

export const updateApplicationFormData = (
  item: React.FormEvent) => (dispatch: Dispatch) => {
    const eventTarget = item.target as HTMLFormElement;
    dispatch({
      payload: eventTarget.value,
      type: ACTION_LIST[eventTarget.name],
    });
  };
