import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../../components/ApplicationSeason/actions';
import { SET_APPLICATION_SEASON } from '../../components/ApplicationSeason/constants';

const middlewares = [thunk];
const mockStoreFactory = configureMockStore(middlewares);

jest.mock('../../store', () => ({
  getState: jest.fn(() => ({ oidc: { user: { id_token: 'test' } } })),
}));

describe('actions', () => {
  const mockStore = mockStoreFactory();
  afterEach(() => {
    fetchMock.restore();
    mockStore.clearActions();
  });

  it('should create a thunk action', async () => {
    const testApplicationSeason = {
      applicationPeriodEnd: '2019-03-03 11:41:04.793276',
      applicationPeriodStart: '2019-03-03 11:41:04.793276',
      end: '2019-03-03 11:41:04.793276',
      start: '2019-03-03 11:41:04.793276',
    };
    fetchMock.get('http://localhost:5000/season/', {
      body: JSON.stringify(testApplicationSeason),
      headers: {
        'Content-type': 'application/json',
      },
    });

    const expectedAction = {
      payload: testApplicationSeason,
      type: SET_APPLICATION_SEASON,
    };
    await mockStore.dispatch<any>(actions.fetchApplicationSeasonData());
    expect(mockStore.getActions()).toContainEqual(expectedAction);
  });

  it('should fail if no body returned', async () => {
    fetchMock.getOnce('http://localhost:5000/season/getSeason', {
      body: '{}',
      headers: {
        'Content-type': 'application/json',
      },
    });
    expect(mockStore.getActions()).toEqual([]);
  });
});
