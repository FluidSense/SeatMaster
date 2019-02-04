import { Dispatch } from 'redux';
import { GET_APPLICATION_SEASON, SET_APPLICATION_SEASON } from './Strings';

// FIXME type shouldn't be any
export const fetchApplicationSeasonData = (): any => (dispatch: Dispatch) => {
  fetch(GET_APPLICATION_SEASON)
    .then(response => response.json())
    .then(result => dispatch({
      payload: result,
      type: SET_APPLICATION_SEASON,
    }));
};
