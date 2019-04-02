export const BASEPATH = 'http://localhost:5000/';

// Room
export const ROOM_URL = `${BASEPATH}room/`;
export const SEAT_URL = `${BASEPATH}seat/`;

// Application
export const POST_FORM_DATA_URL = `${BASEPATH}application/`;
export const GET_APPLICATION_BY_SELF_URL = `${BASEPATH}application/`;
export const GET_APPLICATION_BY_ID_URL = `${BASEPATH}application/`;
export const GET_ALL_APPLICATIONS_URL = `${BASEPATH}application/all`;
export const GET_APPLICATION_BY_USERID_URL = `${BASEPATH}application/byUser/`;
export const POST_APPLICATION_APPROVE_LIST = `${BASEPATH}application/approveList`;
export const POST_WAITING_LIST = `${BASEPATH}application/waitingList`;

// User
export const GET_USER_URL = `${BASEPATH}user/`;
export const GET_ALL_USERS_URL = `${GET_USER_URL}all`;
export const POST_NEW_USER_URL = `${BASEPATH}user/`;
export const DELETE_USER_URL = `${BASEPATH}user/`;
export const DELETE_ALL_USERS_URL = `${BASEPATH}user/deleteAll`;

// Season
export const SEASON_URL = `${BASEPATH}season/`;
export const GET_ALL_SEASONS_URL = `${SEASON_URL}all`;

// Seat
export const ASSIGN_SEAT_URL = `${BASEPATH}seat/assignSeat`;
export const REMOVE_STUDENT_FROM_SEAT_URL = `${BASEPATH}seat/removeStudent`;
export const GET_SEAT_URL = `${BASEPATH}seat/`;

// Mail
export const MAIL_TO_STUDENT = `${BASEPATH}mail/`;
export const MAIL_TO_LIST = `${BASEPATH}mail/`;
