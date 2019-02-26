import { IApplicationSeason } from '../components/ApplicationSeason/reducer';
import { POST_NEW_SEASON_URL } from './../components/commonConstants';
import { getJson, postJson } from './callDefinitions';
import { POST_FORM_DATA_URL, SEASON_API_URL } from './constants';
import { IFetchResponse, IPostApplicationForm, IPostApplicationSeason } from './interfaces';

export const getSeason = (): PromiseLike<IFetchResponse<IApplicationSeason>> => {
  return getJson(SEASON_API_URL);
};

export const postApplicationForm = (data: IPostApplicationForm): PromiseLike<Response> => {
  return postJson(POST_FORM_DATA_URL, data);
};

export const postApplicationSeason = (data: IPostApplicationSeason):
 PromiseLike<IFetchResponse<IApplicationSeason>> => {
  return postJson(POST_NEW_SEASON_URL, data);
};
