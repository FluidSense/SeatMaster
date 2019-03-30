import { AnyAction } from 'redux';
import { IUser } from '../../API/interfaces';
import { REMOVE_STUDENT_SUCCESS, SUCCESSFULL_SEAT_ASSIGNMENT } from '../AssignSeat/constants';
import { FETCH_ROOMS, FETCHED_ROOMS, FETCHING_ROOMS } from './constants';
import { IRoom, ISeat } from './index';

export interface IRoomState {
  fetching: string;
  rooms: IRoom[];
}

const initialState = {
  fetching: FETCHING_ROOMS,
  rooms: [],
};

const reducer = (
  state: IRoomState = initialState,
  action: AnyAction,
): IRoomState => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_ROOMS:
      return {
        ...state,
        fetching: FETCHED_ROOMS,
        rooms: Object.values(payload),
      };
    case SUCCESSFULL_SEAT_ASSIGNMENT:
      const filteredOldRooms = roomsWithRemovedFromOldSeat(state.rooms, payload.user);
      const updatedRooms = roomsWithUpdatedSeat(filteredOldRooms, payload);
      return { ...state, rooms: updatedRooms };
    case REMOVE_STUDENT_SUCCESS:
      const newSeat = payload;
      const rooms = roomsWithUpdatedSeat(state.rooms, newSeat);
      return { ...state, rooms };
    default:
      return state;
  }
};

export default reducer;

const roomsWithUpdatedSeat = (rooms: IRoom[], newSeat: ISeat) => {
  // Returns the old rooms if it could not find the item to replace
  const relevantRoom = rooms.find(iterroom => iterroom.id === newSeat.roomId);
  if (relevantRoom) {
    const mutable = { ...relevantRoom };
    mutable.seats.seats = mutable.seats.seats.map((iterseat) => {
      return iterseat.id === newSeat.id ? newSeat : iterseat;
    });
    const newRooms = rooms.map(iterroom => iterroom.id === mutable.id ? mutable : iterroom);
    if (newRooms) return newRooms;
    return rooms;
  }
  return rooms;
};

const roomsWithRemovedFromOldSeat = (rooms: IRoom[], user: IUser) => {
  const allSeats = rooms.flatMap(iterroom => iterroom.seats.seats);
  const oldSeat = allSeats.find((iterseat) => {
    return iterseat.user && user ? iterseat.user.id === user.id : false;
  });
  if (oldSeat) {
    const mutableSeat = { ...oldSeat };
    mutableSeat.user = undefined;
    const oldRoom = rooms.find(iterroom => iterroom.id === oldSeat.roomId);
    if (oldRoom) {
      const mutable = { ...oldRoom };
      mutable.seats.seats = mutable.seats.seats.map((iterseat) => {
        return iterseat.id === mutableSeat.id ? mutableSeat : iterseat;
      });
      const updatedRooms = rooms.map(iterroom => iterroom.id === mutable.id ? mutable : iterroom);
      return updatedRooms;
    }
    return rooms;
  }
  return rooms;
};
