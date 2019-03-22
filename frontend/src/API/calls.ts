import { IApplication } from '../components/Application';
import { IApplicationSeason } from '../components/ApplicationSeason/reducer';
import { IRoom, ISeat } from '../components/ViewRooms';
import {
  deleteJson,
  elevatedDeleteJson,
  elevatedGetJson,
  elevatedPostJson,
  elevatedPutJson,
  getJson,
  postJson,
} from './callDefinitions';
import {
  ASSIGN_SEAT_URL,
  DELETE_USER_URL,
  GET_ALL_APPLICATIONS_URL,
  GET_APPLICATION_BY_SELF_URL,
  GET_APPLICATION_BY_USERID_URL,
  GET_SEAT_URL,
  GET_USER_URL,
  POST_FORM_DATA_URL,
  POST_NEW_USER_URL,
  ROOM_URL,
  SEASON_URL,
  SEAT_URL,
} from './constants';
import {
  IPostApplicationForm,
  IPostApplicationSeason,
  IPostRoom,
  IPostSeat,
  IPutUserOnSeat,
  IUser,
} from './interfaces';

export const getSeason = (): PromiseLike<IApplicationSeason> => getJson(SEASON_URL);

export const postSeason = (data: IPostApplicationSeason):
  PromiseLike<IApplicationSeason> => {
  return elevatedPostJson(SEASON_URL, data);
};

export const getApplicationFormBySelf = ():
  PromiseLike<IApplication> => {
  return getJson(`${GET_APPLICATION_BY_SELF_URL}`);
};

export const getApplicationFormByUsername = (username: string):
  PromiseLike<IApplication> => {
  return elevatedGetJson(`${GET_APPLICATION_BY_USERID_URL}${username}`);
};

export const getAllApplications = ():
  PromiseLike<IApplication[]> => {
  return elevatedGetJson(GET_ALL_APPLICATIONS_URL);
};

export const postApplicationForm = (data: IPostApplicationForm):
  PromiseLike<IApplication> => {
  return postJson(POST_FORM_DATA_URL, data);
};

export const getUserData = (): PromiseLike<IUser> => {
  return elevatedGetJson(GET_USER_URL);
};

export const postNewCreateUser = ():
  PromiseLike<IUser> => {
  return elevatedPostJson(POST_NEW_USER_URL, {});
};

export const deleteUser = ():
  PromiseLike<IUser> => {
  return deleteJson(DELETE_USER_URL);
};

export const getRoom = (id: number): PromiseLike<IRoom> => {
  return getJson(`${ROOM_URL}${id}`);
};

export const getAllRooms = (): PromiseLike<[IRoom]> => getJson(ROOM_URL);

export const postRoom = (data: IPostRoom): PromiseLike<IRoom> => {
  return elevatedPostJson(ROOM_URL, data);
};

export const putRoom = (data: IPostRoom, id: number): PromiseLike<IRoom> => {
  return elevatedPutJson(`${ROOM_URL}${id}`, data);
};

export const deleteRoom = (id: number): PromiseLike<IRoom> => {
  return elevatedDeleteJson(ROOM_URL, id);
};

export const putUserOnSeat = (data: IPutUserOnSeat): PromiseLike<ISeat> => {
  return elevatedPutJson(ASSIGN_SEAT_URL, data);
};

export const getSeat = (roomId: number, seatId: string): PromiseLike<ISeat> => {
  return elevatedGetJson(`${GET_SEAT_URL}${roomId}/${seatId}`);
};

export const postSeat = (data: IPostSeat): PromiseLike<ISeat> => {
  return elevatedPostJson(SEAT_URL, data);
};

export const deleteSeat = (roomId: number, seatId: string): PromiseLike<ISeat> => {
  return elevatedDeleteJson(SEAT_URL, roomId, seatId)
}
