import { AnyAction, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { getSeat, putUserOnSeat, removeStudentFromSeat } from '../../API/calls';
import { IUser } from '../../API/interfaces';
import { ISeat } from '../ViewRooms';
import {
  FETCH_SEAT,
  REMOVE_STUDENT_SUCCESS,
  SUCCESSFULL_SEAT_ASSIGNMENT,
} from './constants';

const successfullyAssignedSeat = (payload: ISeat) => ({
  payload,
  type: SUCCESSFULL_SEAT_ASSIGNMENT,
});

const successfullyFetchedSeat = (payload: ISeat) => ({
  payload,
  type: FETCH_SEAT,
});

const successfullyRemovedStudent = (payload: ISeat) => ({
  payload,
  type: REMOVE_STUDENT_SUCCESS,
});

export const assignUserToSeat = (user: IUser, seat: ISeat):
  ThunkAction<Promise<void>, {}, {}, AnyAction> => async (dispatch: Dispatch) => {
    const response = await putUserOnSeat({
      roomId: seat.roomId,
      seatId: seat.id,
      userId: user.id,
    });
    if (response) dispatch(successfullyAssignedSeat(response));
  };

export const checkSeatIsOccupied = (roomId: number, seatId: string):
  ThunkAction<Promise<void>, {}, {}, AnyAction> => async (dispatch: Dispatch) => {
    const response = await getSeat(roomId, seatId);
    if (response) dispatch(successfullyFetchedSeat(response));
  };

export const removeStudent = (roomId: number, seatId: string):
  ThunkAction<Promise<void>, {}, {}, AnyAction> => async (dispatch: Dispatch) => {
    const data = { roomId, seatId };
    const response = await removeStudentFromSeat(data);
    if (response) dispatch(successfullyRemovedStudent(response));
  };
