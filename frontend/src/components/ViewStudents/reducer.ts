import { AnyAction } from 'redux';
import { IUser } from '../../API/interfaces';
import {
  FETCHED_STUDENTS,
  FETCHING_STUDENTS,
  REMOVE_SINGLE_STUDENT,
  SET_ALL_STUDENTS,
  SUCCESSFULLY_FETCHED_STUDENTS,
} from './constants';

export interface IUserState {
  fetching: string;
  users: IUser[];
}

const initialState = {
  fetching: FETCHING_STUDENTS,
  users: [],
};

const studentReducer = (
  state: IUserState = initialState,
  action: AnyAction,
): IUserState => {
  const { type, payload } = action;
  switch (type) {
    case SUCCESSFULLY_FETCHED_STUDENTS:
      return {
        ...state,
        fetching: FETCHED_STUDENTS,
        users: Object.values(payload),
      };
    case SET_ALL_STUDENTS:
      return {
        ...state,
        users: payload,
      };
    case REMOVE_SINGLE_STUDENT:
      const filteredUsers = state.users.filter(user => user.id !== payload);
      return {
        ...state,
        users: filteredUsers,
      };
    default:
      return state;
  }
};

export default studentReducer;
