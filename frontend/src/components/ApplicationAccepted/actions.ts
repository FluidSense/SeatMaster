import { AnyAction, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { getRoom } from '../../API/calls';
import { retrievedRooms } from './../ViewRooms/actions';

export const fetchSingleRoom = (roomId: number):
  ThunkAction<Promise<void>, {}, {}, AnyAction> => async (dispatch: Dispatch) => {
    const result = await getRoom(roomId);
    if (result) dispatch(retrievedRooms([result]));
  };
