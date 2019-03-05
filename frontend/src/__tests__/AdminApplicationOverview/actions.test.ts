import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { GET_ALL_APPLICATIONS } from '../../components/AdminApplicationOverview/constants';
import { GET_APPLICATIONS_URL } from './../../API/constants';
import { fetchAllApplications } from './../../components/AdminApplicationOverview/actions';
import {
  FAILED_TO_RETRIEVE_ALL_APPLICATIONS,
} from './../../components/AdminApplicationOverview/constants';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('actions', () => {
  const store = mockStore();
  afterEach(() => {
    fetchMock.restore();
    store.clearActions();
  });

  it('dispatches applications if success', async () => {
    fetchMock.getOnce(GET_APPLICATIONS_URL, {
      body: [],
      headers: {
        'Content-type': 'application/json',
      },
    });

    const expectedAction = {
      payload: [],
      type: GET_ALL_APPLICATIONS,
    };

    await store.dispatch<any>(fetchAllApplications());
    expect(store.getActions()).toContainEqual(expectedAction);
  });

  it('dispatches error if not success', async () => {
    fetchMock.getOnce(GET_APPLICATIONS_URL, {
      body: '',
      headers: {
        'Content-type': 'application/json',
      },
      status: 400,
    });

    const expectedAction = {
      type: FAILED_TO_RETRIEVE_ALL_APPLICATIONS,
    };

    await store.dispatch<any>(fetchAllApplications());
    expect(store.getActions()).toContainEqual(expectedAction);
  });
});
