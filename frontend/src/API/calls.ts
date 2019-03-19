import { IApplication } from '../components/Application';
import { IApplicationSeason } from '../components/ApplicationSeason/reducer';
import { IRoom } from '../components/ViewRooms';
import { deleteJson, elevatedPostJson, getJson, postJson, putJson } from './callDefinitions';
import {
  GET_ALL_APPLICATIONS_URL,
  GET_APPLICATION_BY_SELF_URL,
  GET_APPLICATION_BY_USERID_URL,
  GET_USER_URL,
  POST_FORM_DATA_URL,
  POST_NEW_USER_URL,
  ROOM_URL,
  SEASON_URL,
} from './constants';
import {
  IPostApplicationForm,
  IPostApplicationSeason,
  IPostRoom,
  IUser,
} from './interfaces';

export const getSeason = (): PromiseLike<IApplicationSeason> => getJson(SEASON_URL);

export const postSeason = (data: IPostApplicationSeason):
  PromiseLike<IApplicationSeason> => {
  return postJson(SEASON_URL, data);
};

export const getApplicationFormBySelf = ():
  PromiseLike<IApplication> => {
  return getJson(`${GET_APPLICATION_BY_SELF_URL}`);
};

export const getApplicationFormByUsername = (username: string):
  PromiseLike<IApplication> => {
  return getJson(`${GET_APPLICATION_BY_USERID_URL}${username}`);
};

export const getAllApplications = ():
  PromiseLike<IApplication[]> => {
  return getJson(GET_ALL_APPLICATIONS_URL);
};

export const postApplicationForm = (data: IPostApplicationForm):
  PromiseLike<IApplication> => {
  return postJson(POST_FORM_DATA_URL, data);
};

export const getUserData = (): PromiseLike<IUser> => getJson(GET_USER_URL);

export const postNewCreateUser = (accessToken: string):
  PromiseLike<IUser> => {
  return elevatedPostJson(POST_NEW_USER_URL, {}, accessToken);
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
