// Etikett types
export const ETIKETT_FOCUS = 'fokus';
export const ETIKETT_INFO = 'info';
export const ETIKETT_SUCCESS = 'suksess';
export const ETIKETT_WARNING = 'advarsel';

export const POST_ROOM_NAME = 'name';
export const POST_ROOM_NOTES = 'info';
export const POST_HEADERS = { 'Content-Type': 'application/json' };
// Visual date time format for end users
export const DATE_FORMAT_INPUT_FIELD = 'DD/MM/YYYY - H:mm';

// URL for database
export const POST_NEW_SEASON_URL = 'http://localhost:5000/season/createSeason';
export const POST_NEW_ROOM_URL = 'http://localhost:5000/room/createRoom';
export const GET_USER_BY_NAME_URL = 'http://localhost:5000/user/';
export const POST_NEW_USER_URL = 'http://localhost:5000/user/createUser';

// actions
export const SET_USER_DATA = 'SET_USER_DATA';

// Application status codes
// These are mirrored from the backend
export const APP_NOT_FOUND = 'NOT_FOUND';
export const APP_SUBMITTED = 'SUBMITTED';
export const APP_DENIED = 'DENIED';
export const APP_APPROVED = 'APPROVED';
