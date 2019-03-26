import { AnyAction } from 'redux';
import { IUser } from '../../API/interfaces';
import { SUCCESSFULLY_FETCHED_STUDENTS } from './constants';

export interface IUserState {
  users: IUser[];
}

const initialState = {
  users: [],
};

const studentReducer = (
  state: IUserState = initialState,
  action: AnyAction,
): IUserState => {
  const { type, payload } = action;
  switch (type) {
    case SUCCESSFULLY_FETCHED_STUDENTS:
      return { ...state, users: Object.values(payload) };
    default:
      return state;
  }
};

export default studentReducer;
