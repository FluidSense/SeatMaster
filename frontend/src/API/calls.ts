import { IApplicationSeason } from '../components/ApplicationSeason/reducer';
import { IRoom } from '../components/ViewRooms';
import { deleteJson, getJson, postJson, putJson } from './callDefinitions';
import {
  GET_APPLICATION_BY_USERID_URL, POST_FORM_DATA_URL, ROOM_URL, SEASON_URL,
} from './constants';
import {
  IApplication,
  IPostApplicationForm,
  IPostApplicationSeason,
  IPostRoom,
} from './interfaces';

export const getSeason = (): PromiseLike<IApplicationSeason> => getJson(SEASON_URL);

export const postSeason = (data: IPostApplicationSeason):
  PromiseLike<IApplicationSeason> => {
  return postJson(SEASON_URL, data);
};

export const getApplicationForm = (id: number):
  PromiseLike<IApplication> => {
  return getJson(`${GET_APPLICATION_BY_USERID_URL}${id}`);
};

export const getAllApplications = ():
  PromiseLike<IApplication[]> => {
  return getJson(GET_ALL_APPLICATIONS_URL);
};

export const postApplicationForm = (data: IPostApplicationForm):
  PromiseLike<IApplication> => {
  return postJson(POST_FORM_DATA_URL, data);
};

export const getRoom = (id: number): PromiseLike<IRoom> => {
  return getJson(`${ROOM_URL}${id}`);
};

export const getAllRooms = (): PromiseLike<[IRoom]> => getJson(ROOM_URL);

export const postRoom = (data: IPostRoom): PromiseLike<IRoom> => {
  return postJson(ROOM_URL, data);
};

export const putRoom = (data: IPostRoom, id: number): PromiseLike<IRoom> => {
  return putJson(`${ROOM_URL}${id}`, data);
};

export const deleteRoom = (id: number): PromiseLike<IRoom> => {
  return deleteJson(ROOM_URL, id);
};
