import { AnyAction, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { putUserOnSeat, removeStudentFromSeat } from '../../API/calls';
import { IUser } from '../../API/interfaces';
import { IRoom, ISeat } from '../ViewRooms';
import { REMOVE_STUDENT_SUCCESS, SUCCESSFULL_SEAT_ASSIGNMENT } from './constants';

const successfullyAssignedSeat = () => ({
  type: SUCCESSFULL_SEAT_ASSIGNMENT,
});

const successfullyRemovedStudent = () => ({ type: REMOVE_STUDENT_SUCCESS });

export const assignUserToSeat = (user: IUser, seat: ISeat):
  ThunkAction<Promise<void>, {}, {}, AnyAction> => async (dispatch: Dispatch) => {
    const response = await putUserOnSeat({
      roomId: seat.roomId,
      seatId: seat.id,
      userId: user.id,
    });
    if (response) dispatch(successfullyAssignedSeat());
  };

export const removeStudent = (roomId: number, seatId: string):
  ThunkAction<Promise<void>, {}, {}, AnyAction> => async (dispatch: Dispatch) => {
    const data = { roomId, seatId };
    const response = await removeStudentFromSeat(data);
    if (response) dispatch(successfullyRemovedStudent());
  };
