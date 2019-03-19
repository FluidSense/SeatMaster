import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { ROOM_URL } from '../../API/constants';
import * as actions from '../../components/AdminRoom/actions';
import { CREATE_ROOM, DELETE_ROOM, UPDATE_ROOM } from '../../components/AdminRoom/constants';

const middlewares = [thunk];
const mockStoreFunc = configureMockStore(middlewares);

jest.mock('../../store', () => ({
  getState: jest.fn(() => ({ oidc:{ user: { id_token: 'test' } } })),
}));

describe('actions', () => {
  const mockStore = mockStoreFunc();
  afterEach(() => {
    fetchMock.restore();
    mockStore.clearActions();
  });

  it('should create a thunk action', async () => {
    const testCreateRoom = { name: 'name', info: 'info' };
    fetchMock.post(ROOM_URL, {
      body: JSON.stringify(testCreateRoom),
      headers: {
        'Content-type': 'application/json',
      },
    });
    const expectedAction = {
      payload: true,
      type: CREATE_ROOM,
    };
    await mockStore.dispatch<any>(actions.createRoomAction(testCreateRoom));
    expect(mockStore.getActions()).toContainEqual(expectedAction);
  });

  it('should delete a room', async () => {
    fetchMock.delete(`${ROOM_URL}${200}`, {});
    const expectedAction = {
      payload: true,
      type: DELETE_ROOM,
    };
    await mockStore.dispatch<any>(actions.deleteRoomAction(200));
    expect(mockStore.getActions()).toContainEqual(expectedAction);
  });

  it('should update a room', async () => {
    const testCreateRoom = { name: 'name2', info: 'info2' };
    fetchMock.put(`${ROOM_URL}${1}`, {
      body: JSON.stringify(testCreateRoom),
      headers: {
        'Content-type': 'application/json',
      },
    });
    const expectedAction = {
      payload: true,
      type: UPDATE_ROOM,
    };
    await mockStore.dispatch<any>(actions.updateRoomAction(testCreateRoom, 1));
    expect(mockStore.getActions()).toContainEqual(expectedAction);
  });
});
