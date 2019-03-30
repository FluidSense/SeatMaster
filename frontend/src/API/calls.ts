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
  putJson,
} from './callDefinitions';
import {
  ASSIGN_SEAT_URL,
  DELETE_ALL_USERS_URL,
  DELETE_USER_URL,
  GET_ALL_APPLICATIONS_URL,
  GET_ALL_USERS_URL,
  GET_APPLICATION_BY_ID_URL,
  GET_APPLICATION_BY_SELF_URL,
  GET_APPLICATION_BY_USERID_URL,
  GET_SEAT_URL,
  GET_USER_URL,
  POST_APPLICATION_APPROVE_LIST,
  POST_FORM_DATA_URL,
  POST_NEW_USER_URL,
  REMOVE_STUDENT_FROM_SEAT_URL,
  ROOM_URL,
  SEASON_URL,
  SEAT_URL,
} from './constants';
import {
  IPostAdminApplicationForm,
  IPostApplicationForm,
  IPostApplicationSeason,
  IPostRoom,
  IPutUserOnSeat,
  IRemoveStudentFromSeat,
  IUser,
} from './interfaces';

export const getSeason = (): PromiseLike<IApplicationSeason> => getJson(SEASON_URL);

export const getSeasonFromId = (id: number): PromiseLike<IApplicationSeason> =>
  getJson(`${SEASON_URL}${id}`);

export const postSeason = (data: IPostApplicationSeason):
  PromiseLike<IApplicationSeason> => {
  return elevatedPostJson(SEASON_URL, data);
};

export const putSeason = (data: IPostApplicationSeason, id: number):
  PromiseLike<IApplicationSeason> => {
  return elevatedPutJson(`${SEASON_URL}${id}`, data);
};

export const getApplicationFormBySelf = ():
  PromiseLike<IApplication> => {
  return getJson(`${GET_APPLICATION_BY_SELF_URL}`);
};

export const getApplicationFormByUsername = (username: string):
  PromiseLike<IApplication> => {
  return elevatedGetJson(`${GET_APPLICATION_BY_USERID_URL}${username}`);
};

export const getApplicationFormById = (id: number):
  PromiseLike<IApplication> => {
  return elevatedGetJson(`${GET_APPLICATION_BY_ID_URL}${id}`);
};

export const getAllApplications = ():
  PromiseLike<IApplication[]> => {
  return elevatedGetJson(GET_ALL_APPLICATIONS_URL);
};

export const postApplicationForm = (data: IPostApplicationForm):
  PromiseLike<IApplication> => {
  return elevatedPostJson(POST_FORM_DATA_URL, data);
};

export const putApplicationForm = (data: IPostApplicationForm):
  PromiseLike<IApplication> => {
  return putJson(POST_FORM_DATA_URL, data);
};

export const postAdminApplicationApproveList = (ids: number[]):
  PromiseLike<IApplication[]> => {
  return elevatedPostJson(POST_APPLICATION_APPROVE_LIST, { ids });
};

export const putAdminApplicationForm = (id: number, data: IPostAdminApplicationForm):
  PromiseLike<IApplication> => {
  return elevatedPutJson(`${POST_FORM_DATA_URL}${id}`, data);
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

export const removeStudentFromSeat = (data: IRemoveStudentFromSeat): PromiseLike<ISeat> => {
  return elevatedPutJson(REMOVE_STUDENT_FROM_SEAT_URL, data);
};

export const getSeat = (roomId: number, seatId: string): PromiseLike<ISeat> => {
  return elevatedGetJson(`${GET_SEAT_URL}${roomId}/${seatId}`);
};

export const postSeat = (data: ISeat): PromiseLike<ISeat> => {
  return elevatedPostJson(SEAT_URL, data);
};

export const deleteSeat = (roomId: number, seatId: string): PromiseLike<ISeat> => {
  return elevatedDeleteJson(SEAT_URL, roomId, seatId);
};

export const getAllUsers = (): PromiseLike<[IUser]> => {
  return elevatedGetJson(GET_ALL_USERS_URL);
};

export const deleteSingleUser = (id: number): PromiseLike<IUser> => {
  return elevatedDeleteJson(DELETE_USER_URL, id);
};

export const deleteAllUsers = (): PromiseLike<[IUser]> => {
  return elevatedDeleteJson(DELETE_ALL_USERS_URL);
};
