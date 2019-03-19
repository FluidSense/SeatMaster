// TODO: make the form component reflect Room type and change preferredRoom to IRoom
export interface IPostApplicationForm {
  comments: string;
  seatRollover?: boolean;
  needs?: string;
  partnerUsername?: string;
  preferredRoom?: string;
}

export interface IPostApplicationSeason {
  newPeriodEnd: string;
  newPeriodStart: string;
  newRoomEnd: string;
  newRoomStart: string;
}

export interface IPostRoom {
  name: string;
  info: string;
}

// FIXME Move this to a fitting place and export the hell out of it
export interface IUser {
  email: string;
  fullname: string;
  id: number;
  masterStatus: string;
  username: string;
  admin: boolean;
}
