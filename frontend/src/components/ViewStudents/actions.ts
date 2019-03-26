import { AnyAction, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { getAllUsers, deleteSingleUser, deleteAllUsers } from '../../API/calls';
import { IUser } from '../../API/interfaces';
import {
  SUCCESFULLY_FETCHED_STUDENTS,
  SUCCESSFULLY_DELETED_ALL_STUDENTS,
  SUCCESSFULLY_DELETED_STUDENT,
} from './constants';

export const retrievedUsers = (payload: IUser[]) => ({
  payload,
  type: SUCCESFULLY_FETCHED_STUDENTS,
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
