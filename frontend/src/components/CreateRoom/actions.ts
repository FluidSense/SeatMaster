import { AnyAction, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { postRoom } from '../../API/calls';
import { IPostRoom } from '../../API/interfaces';
import { IRoom } from '../ViewRooms';
import { CREATE_ROOM, ROOM_SUCCESS, UPDATE_ROOM } from './constants';

const roomCreated = (payload: boolean) => ({
  payload,
  type: CREATE_ROOM,
});

const roomUpdated = (payload: boolean) => ({
  payload,
  type: UPDATE_ROOM,
});

export const createRoom = (room: IPostRoom):
  ThunkAction<Promise<void>, {}, {}, AnyAction> => async (dispatch: Dispatch) => {
    const result = await postRoom(room);
    if (result) dispatch(roomCreated(true));
    else dispatch(roomCreated(false));
  };
