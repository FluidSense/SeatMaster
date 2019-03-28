import { AnyAction, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { IPostApplicationSeason } from '../../API/interfaces';
import {
  RESET_SUBMIT,
  SUBMITTED_APPLICATION_SEASON,
  UPDATE_APPLICATION_SEASON,
} from '../ApplicationSeason/constants';
import { postSeason, putSeason } from './../../API/calls';

const newSeasonCreated = (payload: boolean) => ({
  payload,
  type: SUBMITTED_APPLICATION_SEASON,
});

const updateSeason = (payload: boolean) => ({
  payload,
  type: UPDATE_APPLICATION_SEASON,
});

export const postNewSeason = (body: IPostApplicationSeason):
  ThunkAction<Promise<void>, {}, {}, AnyAction> => async (dispatch: Dispatch) => {
    const result = await postSeason(body);
    if (result) dispatch(newSeasonCreated(true));
    else dispatch(newSeasonCreated(false));
  };

export const putNewSeason = (body: IPostApplicationSeason, id: number):
  ThunkAction<Promise<void>, {}, {}, AnyAction> => async (dispatch: Dispatch) => {
    const result = await putSeason(body, id);
    if (result) dispatch(updateSeason(true));
    else dispatch(updateSeason(false));
  };

export const resetSubmit = () => ({ type: RESET_SUBMIT });
