import { IRoom } from './../components/ViewRooms/index';

export interface IPostApplicationForm {
  comments: string;
  keepSeat?: boolean;
  needs?: string;
  partnerUsername?: string;
  room?: IRoom;
  username: string;
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
  partnerApplication?: IApplication;
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

export interface IPostSeat {
  id: string;
  roomId: number;
  info: string;
}

// FIXME Move this to a fitting place and export the hell out of it
export interface IUser {
  id: number;
  username: string;
}
