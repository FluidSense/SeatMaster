import { AnyAction, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { putUserOnSeat } from '../../API/calls';
import { IUser } from '../../API/interfaces';
import { IRoom, ISeat } from '../ViewRooms';
import { SUCCESSFULL_SEAT_ASSIGNMENT } from './constants';

const successfullyAssignedSeat = () => ({
  type: SUCCESSFULL_SEAT_ASSIGNMENT,
});

export const assignUserToSeat = (user: IUser, room: IRoom, seat: ISeat):
  ThunkAction<Promise<void>, {}, {}, AnyAction> => async (dispatch: Dispatch) => {
    const response = await putUserOnSeat({
      roomId: room.id,
      seatId: seat.id,
      userId: user.id,
    });
    if (response) dispatch(successfullyAssignedSeat());
  };
