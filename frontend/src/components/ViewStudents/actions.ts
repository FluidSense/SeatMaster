import { AnyAction, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { deleteAllUsers, deleteSingleUser, getAllUsers } from '../../API/calls';
import { IUser } from '../../API/interfaces';
import {
  SUCCESSFULLY_DELETED_ALL_STUDENTS,
  SUCCESSFULLY_DELETED_STUDENT,
  SUCCESSFULLY_FETCHED_STUDENTS,
} from './constants';

export const retrievedUsers = (payload: IUser[]) => ({
  payload,
  type: SUCCESSFULLY_FETCHED_STUDENTS,
});

export const fetchAllStudents = ():
  ThunkAction<Promise<void>, {}, {}, AnyAction> => async (dispatch: Dispatch) => {
    const result = await getAllUsers();
    if (result) dispatch(retrievedUsers(result));
  };

export const deleteSingleStudent = (id: number):
  ThunkAction<Promise<void>, {}, {}, AnyAction> => async (dispatch: Dispatch) => {
    const result = await deleteSingleUser(id);
    if (result) dispatch({ type: SUCCESSFULLY_DELETED_STUDENT });
  };

export const deleteAllStudents = ():
  ThunkAction<Promise<void>, {}, {}, AnyAction> => async (dispatch: Dispatch) => {
    const result = await deleteAllUsers();
    if (result) dispatch({ type: SUCCESSFULLY_DELETED_ALL_STUDENTS });
  };