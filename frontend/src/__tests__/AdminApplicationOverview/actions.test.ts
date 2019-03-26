import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';
import { UserState } from 'redux-oidc';
import thunk from 'redux-thunk';
import { GET_ALL_APPLICATIONS } from '../../components/AdminApplicationOverview/constants';
import store from '../../store';
import { GET_ALL_APPLICATIONS_URL } from './../../API/constants';
import { fetchAllApplications } from './../../components/AdminApplicationOverview/actions';
import {
  FAILED_TO_RETRIEVE_ALL_APPLICATIONS,
} from './../../components/AdminApplicationOverview/constants';

jest.mock('../../store', () => ({
  getState: jest.fn(() => ({
    oidc: {
      user: {
        id_token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6ImIwMGE1MDYxY',
      },
    },
  })),
}));

const middlewares = [thunk];
const mockStoreFunc = configureMockStore(middlewares);

describe('actions', () => {
  const mockStore = mockStoreFunc();
  /*store.dispatch.mockImplementation((command: any) => mockStore.dispatch(command));
  store.getActions.mockImplementation(() => mockStore.getActions());
  store.clearActions.mockImplementation(() => mockStore.clearActions());*/
  afterEach(() => {
    fetchMock.restore();
    mockStore.clearActions();
  });

  it('dispatches applications if success', async () => {
    fetchMock.getOnce(GET_ALL_APPLICATIONS_URL, {
      body: [],
      headers: {
        'Content-type': 'application/json',
      },
    });

    const expectedAction = {
      payload: [],
      type: GET_ALL_APPLICATIONS,
    };
    await mockStore.dispatch<any>(fetchAllApplications());
    expect(mockStore.getActions()).toContainEqual(expectedAction);
  });

  it('dispatches error if not success', async () => {
    fetchMock.getOnce(GET_ALL_APPLICATIONS_URL, {
      body: '',
      headers: {
        'Content-type': 'application/json',
      },
      status: 400,
    });

    const expectedAction = {
      type: FAILED_TO_RETRIEVE_ALL_APPLICATIONS,
    };

    await mockStore.dispatch<any>(fetchAllApplications());
    expect(mockStore.getActions()).toContainEqual(expectedAction);
  });
});
