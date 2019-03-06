import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { IUser } from '../../API/interfaces';
import { ISeat } from '../../components/ViewRooms';
import { ASSIGN_SEAT_URL } from './../../API/constants';
import { assignUserToSeat } from './../../components/AssignSeat/actions';
import { SUCCESSFULL_SEAT_ASSIGNMENT } from './../../components/AssignSeat/constants';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('actions', () => {
  const store = mockStore();
  afterEach(() => {
    fetchMock.restore();
    store.clearActions();
  });

  const testUser: IUser = {
    id: 1,
    username: '',
  };

  const testSeat: ISeat = {
    id: 'D1',
    info: 'no',
    roomId: 2,
  };

  it('dispatches success if success', async () => {
    fetchMock.putOnce(ASSIGN_SEAT_URL, {
      body: [],
      headers: {
        'Content-type': 'application/json',
      },
    });

    const expectedAction = {
      type: SUCCESSFULL_SEAT_ASSIGNMENT,
    };

    await store.dispatch<any>(assignUserToSeat(testUser, testSeat));
    expect(store.getActions()).toContainEqual(expectedAction);
  });

  it('dispatches error if not success', async () => {
    fetchMock.putOnce(ASSIGN_SEAT_URL, {
      body: '',
      headers: {
        'Content-type': 'application/json',
      },
      status: 400,
    });

    await store.dispatch<any>(assignUserToSeat(testUser, testSeat));
    expect(store.getActions()).toEqual([]);
  });
});
