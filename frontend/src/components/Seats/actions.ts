import { AnyAction, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { ISeat } from '.';
import { deleteSeat, postSeat, updateSeatName } from '../../API/calls';
import { IPostSeat } from '../../API/interfaces';
import { CREATE_SEAT, DELETE_SEAT, UPDATE_SEAT } from './constants';

const seatCreated = (success: boolean, seat?: ISeat) => ({
  seat,
  success,
  type: CREATE_SEAT,
});

const seatUpdated = (success: boolean) => ({
  success,
  type: UPDATE_SEAT,
});

const seatDeleted = (success: boolean) => ({
  success,
  type: DELETE_SEAT,
});

export const createSeatAction = (seat: IPostSeat):
  ThunkAction<Promise<void>, {}, {}, AnyAction> => async (dispatch: Dispatch) => {
    const result = await postSeat(seat);
    if (result) dispatch(seatCreated(true, result));
    else dispatch(seatCreated(false));
  };

export const deleteSeatAction = (seatId: number):
  ThunkAction<Promise<void>, {}, {}, AnyAction> => async (dispatch: Dispatch) => {
    const result = await deleteSeat(seatId);
    if (result) dispatch(seatDeleted(true));
    else dispatch(seatDeleted(false));
  };

export const updateSeatAction = (seatId: number, newName: string):
  ThunkAction<Promise<void>, {}, {}, AnyAction> => async (dispatch: Dispatch) => {
    const results = await updateSeatName(seatId, newName);
    if (results) dispatch(seatUpdated(true));
    else dispatch(seatUpdated(false));
  };
