import { IApplicationSeason } from '../components/ApplicationSeason/reducer';

export interface IPostApplicationForm {
  comments: string;
  keepSeat: boolean;
  needs: string;
  partnerUsername: string;
  // Rewrite to a room interface
  room: string;
  username: string;
}

export interface IPostApplicationSeason {
  newPeriodEnd: string;
  newPeriodStart: string;
  newRoomEnd: string;
  newRoomStart: string;
}

export interface IFetchResponse<T> {
  data: T;
  status: number;
}
