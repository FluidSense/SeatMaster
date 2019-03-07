import { AnyAction } from 'redux';
import { CREATE_SEAT } from '../Seats/constants';
import { FETCH_ROOMS } from './constants';
import { IRoom, ISeat } from './index';

export interface IRoomState {
  rooms: IRoom[];
}

const initialState = {
  rooms: [],
};

const reducer = (
  state: IRoomState = initialState,
  action: AnyAction,
): IRoomState => {
  const { type, payload, seat } = action;
  switch (type) {
    case FETCH_ROOMS:
      return { ...state, rooms: payload };
    case CREATE_SEAT:
      const newRooms: IRoom[] = state.rooms.map((thisRoom) => {
        const returnValue = { ...thisRoom };
        if (thisRoom.id === 9) {
          thisRoom.seats.seats = [...thisRoom.seats.seats, seat];
        }
        return returnValue;
      });
      return {
        ...state,
        rooms: newRooms,
      };
    default:
      return state;
  }
};

export default reducer;
