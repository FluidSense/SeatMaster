import { IRoom } from './../components/ViewRooms/index';

export interface IPostApplicationForm {
  comments: string;
  keepSeat?: boolean;
  needs?: string;
  partnerUsername?: string;
  room?: IRoom;
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

// FIXME Move this to a fitting place and export the hell out of it
export interface IUser {
<<<<<<< HEAD
=======
  email: string;
  fullname: string;
>>>>>>> ef6b5ce... Reworked API calls for authentication
  id: number;
  masterStatus: string;
  username: string;
}
