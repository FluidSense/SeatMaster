import { AnyAction, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { deleteRoom, getRoom, postRoom, putRoom } from '../../API/calls';
import { IPostRoom } from '../../API/interfaces';
import { IRoom } from '../ViewRooms';
import { CREATE_ROOM, DELETE_ROOM, FETCH_ROOM_CSV, RESET_PAGE, UPDATE_ROOM } from './constants';

const roomCreated = (payload: boolean) => ({
  payload,
  type: CREATE_ROOM,
});

const roomUpdated = (payload: boolean) => ({
  payload,
  type: UPDATE_ROOM,
});

const roomDeleted = (payload: boolean) => ({
  payload,
  type: DELETE_ROOM,
});

const fetchedRoomInfo = (payload: IRoom) => ({
  payload,
  type: FETCH_ROOM_CSV,
});

export const createRoomAction = (room: IPostRoom):
  ThunkAction<Promise<void>, {}, {}, AnyAction> => async (dispatch: Dispatch) => {
    const result = await postRoom(room);
    if (result) dispatch(roomCreated(true));
    else dispatch(roomCreated(false));
  };

export const deleteRoomAction = (id: number):
  ThunkAction<Promise<void>, {}, {}, AnyAction> => async (dispatch: Dispatch) => {
    const result = await deleteRoom(id);
    if (result) dispatch(roomDeleted(true));
    else dispatch(roomDeleted(false));
  };

export const updateRoomAction = (data: IPostRoom, id: number):
  ThunkAction<Promise<void>, {}, {}, AnyAction> => async (dispatch: Dispatch) => {
    const result = await putRoom(data, id);
    if (result) dispatch(roomUpdated(true));
    else dispatch(roomUpdated(false));
  };

export const resetPage = () => ({ payload: undefined, type: RESET_PAGE });

export const fetchRoomInformation = (roomId: number):
  ThunkAction<Promise<void>, {}, {}, AnyAction> => async (dispatch: Dispatch) => {
    const result = await getRoom(roomId);
    if (result) dispatch(fetchedRoomInfo(result));
  };
