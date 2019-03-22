import { AnyAction, Dispatch } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { postSeat, deleteSeat } from '../../API/calls';
import { IPostSeat } from '../../API/interfaces';
import { ISeat } from '../ViewRooms';
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

// export const createSeat = (seats: ISeat[], idOfRoom: number):
//   ThunkAction<Promise<void>, {}, {}, AnyAction> => async (dispatch: ThunkDispatch<{}, {}, any>) => {
//     let nextID = 'A1';
//     if (seats.length > 0) {
//       // Splits id in letters and numbers
//       const idParts = seats[seats.length - 1].id.split(/([0-9]+)/);
//       // Creates new id by incrementing the number on the last id
//       nextID = `${idParts[0]}${parseInt(idParts[1], 10) + 1}`;
//     }

//     const seat: IPostSeat = {
//       id: nextID,
//       info: '',
//       roomId: idOfRoom,
//     };
//     dispatch(createSeatAction(seat));
//   };

export const createSeatAction = (seat: IPostSeat):
  ThunkAction<Promise<void>, {}, {}, AnyAction> => async (dispatch: Dispatch) => {
    const result = await postSeat(seat);
    if (result) dispatch(seatCreated(true, result));
    else dispatch(seatCreated(false));
  };

export const deleteSeatAction = (roomId: number, seatId: string):
  ThunkAction<Promise<void>, {}, {}, AnyAction> => async (dispatch: Dispatch) => {
    const result = await deleteSeat(roomId, seatId);
    if (result) dispatch(seatDeleted(true));
    else dispatch(seatDeleted(false))
  };

export const updateSeatAction = (roomId: number, oldSeatId: string, newSeat: IPostSeat):
  ThunkAction<Promise<void>, {}, {}, AnyAction> => async (dispatch: Dispatch) => {
    const deleteResults = await deleteSeat(roomId, oldSeatId);
    if (deleteResults) {
      const createResult = await postSeat(newSeat);
      if (createResult) dispatch(seatUpdated(true))
    }
    dispatch(seatUpdated(false))
  };
