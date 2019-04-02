import { SET_APPLICATION_DATA } from '../AdminApplicationOverview/constants';
import { IApplication } from '../Application';

export const setApplication = (payload: IApplication) => ({
  payload,
  type: SET_APPLICATION_DATA,
});
