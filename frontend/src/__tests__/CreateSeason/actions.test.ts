
import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../../components/CreateSeason/actions';
import { SUBMITTED_APPLICATION_SEASON } from '../../components/CreateSeason/strings';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('actions', () => {
  const store = mockStore();
  afterEach(() => {
    fetchMock.restore();
    store.clearActions();
  });

  const testApplicationSeason = {
    applicationPeriodEnd: '2019-03-03 11:41:04.793276',
    applicationPeriodStart: '2019-03-03 11:41:04.793276',
    end: '2019-03-03 11:41:04.793276',
    start: '2019-03-03 11:41:04.793276',
  };
  const postSeason = {
    newPeriodEnd: testApplicationSeason.applicationPeriodEnd,
    newPeriodStart: testApplicationSeason.applicationPeriodStart,
    newRoomEnd: testApplicationSeason.end,
    newRoomStart: testApplicationSeason.start,
  };

  it('should create a thunk action', async () => {
    fetchMock.postOnce('http://localhost:5000/season/', {
      body: JSON.stringify(testApplicationSeason),
      headers: {
        'Content-type': 'application/json',
      },
    });

    const expectedAction = {
      payload: true,
      type: SUBMITTED_APPLICATION_SEASON,
    };
    await store.dispatch<any>(actions.postNewSeason(postSeason));
    expect(store.getActions()).toContainEqual(expectedAction);
  });

  it('should be false if no season returned', async () => {
    fetchMock.postOnce('http://localhost:5000/season/', {
      body: '',
      status: 400,
    });
    const expectedAction = {
      payload: false,
      type: SUBMITTED_APPLICATION_SEASON,
    };
    await store.dispatch<any>(actions.postNewSeason(postSeason));
    expect(store.getActions()).toContainEqual(expectedAction);
  });
});