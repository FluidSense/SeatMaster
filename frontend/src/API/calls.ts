import { IApplicationSeason } from '../components/ApplicationSeason/reducer';
import { IRoom } from '../components/ViewRooms';
import { POST_NEW_ROOM_URL, POST_NEW_SEASON_URL } from './../components/commonConstants';
import { getJson, postJson } from './callDefinitions';
import {
  GET_APPLICATION_BY_USERID_URL,
  GET_ROOM_URL, POST_FORM_DATA_URL,
  SEASON_API_URL,
} from './constants';
import {
  IApplicationForm,
  IPostApplicationForm,
  IPostApplicationSeason,
  IPostRoom,
} from './interfaces';

export const getSeason = (): PromiseLike<IApplicationSeason> => {
  return getJson(SEASON_API_URL);
};

export const postSeason = (data: IPostApplicationSeason):
 PromiseLike<IApplicationSeason> => {
  return postJson(POST_NEW_SEASON_URL, data);
};

export const getApplicationForm = (id: number):
 PromiseLike<IApplicationForm> => {
  return getJson(`${GET_APPLICATION_BY_USERID_URL}${id}`);
};

export const postApplicationForm = (data: IPostApplicationForm):
 PromiseLike<IApplicationForm> => {
  return postJson(POST_FORM_DATA_URL, data);
};

export const getRoom = (id: number): PromiseLike<IRoom> => {
  return getJson(`${GET_ROOM_URL}${id}`);
};

export const getAllRooms = (): PromiseLike<[IRoom]> => {
  return getJson(GET_ROOM_URL);
};

export const postRoom = (data: IPostRoom): PromiseLike<IRoom> => {
  return postJson(POST_NEW_ROOM_URL, data);
};
