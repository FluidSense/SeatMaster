import { AnyAction, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { ACTION_LIST, POST_FORM_DATA } from './Strings';

export const sendApplicationFormData = ():
  ThunkAction<Promise<void>, {}, {}, AnyAction> => async (dispatch: Dispatch) => {
//
  };

export const updateApplicationFormData = (
  item: React.FormEvent) => (dispatch: Dispatch) => {
    const eventTarget = item.target as HTMLFormElement;
    const value = eventTarget.type === 'checkbox' ? eventTarget.checked : eventTarget.value;
    dispatch({
      payload: value,
      type: ACTION_LIST[eventTarget.name],
    });
  };
