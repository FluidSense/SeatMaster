// TODO: make the form component reflect Room type and change preferredRoom to IRoom
export interface IPostApplicationForm {
  comments?: string;
  seatRollover?: boolean;
  needs?: string;
  partnerUsername?: string;
  preferredRoom?: string;
}

export interface IPostAdminApplicationForm extends IPostApplicationForm {
  rank?: string;
  status?: string;
}

export interface IPostApplicationSeason {
  newPeriodEnd: string;
  newPeriodStart: string;
  newRoomEnd: string;
  newRoomStart: string;
}

export interface IPutUserOnSeat {
  userId: number;
  seatId: number;
}

export interface IPostRoom {
  name: string;
  info: string;
}

export interface IPostSeat {
  name: string;
  info: string;
  roomId: number;
}

// FIXME Move this to a fitting place and export the hell out of it
export interface IUser {
  email: string;
  fullname: string;
  id: number;
  username: string;
  admin: boolean;
}
