import { AnyAction, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { deleteUser } from '../../API/calls';

const removeUserData = () => ({
  type: 'REMOVE_USER_DATA',
});

export const deleteAndRemoveUser = ():
  ThunkAction<Promise<void>, {}, {}, AnyAction> => async (dispatch: Dispatch) => {
    const result = await deleteUser();
    if (result) dispatch(removeUserData());
  };
