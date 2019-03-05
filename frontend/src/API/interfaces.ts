import { IRoom } from './../components/ViewRooms/index';

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

// FIXME Move me along IApplication
export interface IPartnerApplication {
  comments: string;
  id: number;
  needs: string;
  partnerApplication?: IApplicationForm;
  preferredRoom: string;
  seatRollover: boolean;
  status: string;
}

// FIXME Move this to a place where application form should be denoted.
export interface IApplication extends IPartnerApplication {
  user: IUser;
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
}
