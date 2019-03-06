import { AnyAction, Dispatch } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { IPostSeat } from '../../API/interfaces';
import { ISeat } from '../ViewRooms';
import { CREATE_SEAT, DELETE_SEAT, UPDATE_SEAT } from './constants';
import { postSeat } from '../../API/calls';

const seatCreated = (payload: boolean) => ({
  payload,
  type: CREATE_SEAT,
});

const seatUpdated = (payload: boolean) => ({
  payload,
  type: UPDATE_SEAT,
});

const seatDeleted = (payload: boolean) => ({
  payload,
  type: DELETE_SEAT,
});

export const createSeat = (seats: ISeat[], idOfRoom: number):
  ThunkAction<Promise<void>, {}, {}, AnyAction> => async (dispatch: ThunkDispatch<{}, {}, any>) => {
    let nextID = 'A1';
    if (seats.length > 0) {
      // Splits id in letters and numbers
      const idParts = seats[seats.length - 1].id.split(/([0-9]+)/);
      // Creates new id by incrementing the number on the last id
      nextID = `${idParts[0]}${parseInt(idParts[1], 10) + 1}`;
    }

    const seat: IPostSeat = {
      id: nextID,
      info: '',
      roomId: idOfRoom,
    };
    console.log("SEAT CREATED", nextID, idOfRoom);
    dispatch(createSeatAction(seat));
  };

export const createSeatAction = (seat: IPostSeat):
  ThunkAction<Promise<void>, {}, {}, AnyAction> => async (dispatch: Dispatch) => {
    const result = await postSeat(seat);
    if (result) dispatch(seatCreated(true));
    else dispatch(seatCreated(false));
  };
