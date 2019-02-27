import { AnyAction, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { getAllRooms } from '../../API/calls';
import { FETCH_ROOMS } from './constants';
import { IRoom } from './index';

/*
const retrievedRooms = (payload: IRoom[]) => ({
  payload,
  type: FETCH_ROOMS,
});

export const fetchAllRooms = ():
  ThunkAction<Promise<void>, {}, {}, AnyAction> => async (dispatch: Dispatch) => {
    const result = await getAllRooms();
    if (result) dispatch(retrievedRooms(result));
  };
*/

const action = (payload: any) => ({
  payload,
  type: 'ACTION',
});

export const thunkAction = ():
  ThunkAction<Promise<void>, {}, {}, AnyAction> => async (dispatch: Dispatch) => {
    const result = await undefined;
    if (result) dispatch(action(result));
  };
