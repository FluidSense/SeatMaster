import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { fetchApplicationSeasonData } from '../../components/ApplicationSeason/actions';
import { SET_APPLICATION_SEASON } from '../../components/ApplicationSeason/constants';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('actions', () => {
  afterEach(() => {
    fetchMock.restore();
  });
  const store = mockStore();

  it('should create a thunk action', () => {
    const testApplicationSeason = {
      applicationPeriodEnd: '2019-03-03 11:41:04.793276',
      applicationPeriodStart: '2019-03-03 11:41:04.793276',
      end: '2019-03-03 11:41:04.793276',
      start: '2019-03-03 11:41:04.793276',
    };
    fetchMock.get('http://localhost:5000/season/getSeason', {
      body: JSON.stringify(testApplicationSeason),
      headers: {
        'Content-type': 'application/json',
      },
    });

    const dummyaction = () => async () => ({ type:'DUMMY', payload:{ key:'value' } });

    const expectedAction = {
      payload: testApplicationSeason,
      type: SET_APPLICATION_SEASON,
    };

    return store.dispatch<any>(fetchApplicationSeasonData()).then(() => {
      expect(store.getActions()).toContainEqual(expectedAction);
    });

    /*return store.dispatch<any>(fetchApplicationSeasonData()).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });*/
  });

  it('should fail if no body returned', () => {
    fetchMock.getOnce('http://localhost:5000/season/getSeason', {
      body: '',
      headers: {
        'Content-type': 'application/json',
      },
    });

    return expect(store.dispatch<any>(fetchApplicationSeasonData()).rejects());
  });
});
