import { IRoom } from './../components/ViewRooms/index';

export interface IPostApplicationForm {
  comments: string;
  keepSeat: boolean;
  needs: string;
  partnerUsername: string;
  room: IRoom;
  username: string;
}

export interface IPostApplicationSeason {
  newPeriodEnd: string;
  newPeriodStart: string;
  newRoomEnd: string;
  newRoomStart: string;
}

// FIXME Move me along IApplicationForm
export interface IPartnerApplicationForm {
  comments: string;
  id: number;
  needs: string;
  partnerApplication?: IApplicationForm;
  status: string;
}

// FIXME Move this to a place where application form should be denoted.
export interface IApplicationForm extends IPartnerApplicationForm {
  user: IUser;
}

export interface IPostRoom {
  name: string;
  info: string;
}

// FIXME Move this to a fitting place and export the hell out of it
interface IUser {
  id: number;
  username: string;
}
