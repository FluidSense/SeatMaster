import { AnyAction, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { deleteAllUsers, deleteSingleUser, getAllUsers } from '../../API/calls';
import { IUser } from '../../API/interfaces';
import {
  REMOVE_SINGLE_STUDENT,
  SET_ALL_STUDENTS,
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
    if (result) {
      const deletedStudent = dispatch({ type: SUCCESSFULLY_DELETED_STUDENT });
      if (deletedStudent) dispatch(removeSingleStudent(id));
    }
  };

export const deleteAllStudents = ():
  ThunkAction<Promise<void>, {}, {}, AnyAction> => async (dispatch: Dispatch) => {
    const result = await deleteAllUsers();
    if (result) {
      const deletedStudents = dispatch({ type: SUCCESSFULLY_DELETED_ALL_STUDENTS });
      if (deletedStudents) dispatch(setAllStudents([]));
    }
  };

export const setAllStudents = (students: IUser[]) => ({
  payload: students,
  type: SET_ALL_STUDENTS,
});

export const removeSingleStudent = (id: number) => ({
  payload: id,
  type: REMOVE_SINGLE_STUDENT,
});
