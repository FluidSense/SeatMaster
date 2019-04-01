import { AnyAction, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { IPostApplicationSeason } from '../../API/interfaces';
import {
  RESET_SUBMIT,
  SUBMITTED_APPLICATION_SEASON,
  SUBMITTED_APPLICATION_SEASON_FAILED,
  UPDATE_APPLICATION_SEASON,
} from '../ApplicationSeason/constants';
import { IApplicationSeason } from '../ApplicationSeason/reducer';
import { postSeason, putSeason } from './../../API/calls';

const newSeasonCreated = (payload: IApplicationSeason) => ({
  payload,
  type: SUBMITTED_APPLICATION_SEASON,
});

const newSeasonCreatedFailed = () => ({ type: SUBMITTED_APPLICATION_SEASON_FAILED });

const updateSeason = (payload: boolean) => ({
  payload,
  type: UPDATE_APPLICATION_SEASON,
});

export const postNewSeason = (body: IPostApplicationSeason):
  ThunkAction<Promise<void>, {}, {}, AnyAction> => async (dispatch: Dispatch) => {
    const result = await postSeason(body);
    if (result) dispatch(newSeasonCreated(result));
    else dispatch(newSeasonCreatedFailed());
  };

export const putNewSeason = (body: IPostApplicationSeason, id: number):
  ThunkAction<Promise<void>, {}, {}, AnyAction> => async (dispatch: Dispatch) => {
    const result = await putSeason(body, id);
    if (result) dispatch(updateSeason(true));
    else dispatch(updateSeason(false));
  };

export const resetSubmit = () => ({ type: RESET_SUBMIT });
