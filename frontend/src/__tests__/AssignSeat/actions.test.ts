import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { IUser } from '../../API/interfaces';
import { ISeat } from '../../components/ViewRooms';
import { ASSIGN_SEAT_URL } from './../../API/constants';
import { assignUserToSeat } from './../../components/AssignSeat/actions';
import { SUCCESSFULL_SEAT_ASSIGNMENT } from './../../components/AssignSeat/constants';

const middlewares = [thunk];
const mockStoreFactory = configureMockStore(middlewares);

jest.mock('../../store', () => ({
  getState: jest.fn(() => ({ oidc:{ user: { id_token: 'test' } } })),
}));

describe('actions', () => {
  const mockStore = mockStoreFactory();
  afterEach(() => {
    fetchMock.restore();
    mockStore.clearActions();
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

    await mockStore.dispatch<any>(assignUserToSeat(testUser, testSeat));
    expect(mockStore.getActions()).toContainEqual(expectedAction);
  });

  it('dispatches error if not success', async () => {
    fetchMock.putOnce(ASSIGN_SEAT_URL, {
      body: '',
      headers: {
        'Content-type': 'application/json',
      },
      status: 400,
    });

    await mockStore.dispatch<any>(assignUserToSeat(testUser, testSeat));
    expect(mockStore.getActions()).toEqual([]);
  });
});
