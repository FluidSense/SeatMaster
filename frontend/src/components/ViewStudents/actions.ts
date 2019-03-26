import { AnyAction, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { getAllUsers } from '../../API/calls';
import { IUser } from '../../API/interfaces';
import { SUCCESFULLY_FETCHED_STUDENTS } from './constants';

export const retrievedUsers = (payload: IUser[]) => ({
  payload,
  type: SUCCESFULLY_FETCHED_STUDENTS,
});

export const fetchAllStudents = ():
  ThunkAction<Promise<void>, {}, {}, AnyAction> => async (dispatch: Dispatch) => {
    const result = await getAllUsers();
    if (result) dispatch(retrievedUsers(result));
  };
