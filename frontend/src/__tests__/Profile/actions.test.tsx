
import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../../components/Profile/actions';

const middlewares = [thunk];
const mockStoreFunc = configureMockStore(middlewares);

jest.mock('../../store', () => ({
  getState: jest.fn(() => ({ oidc: { user: { id_token: 'test' } } })),
}));

describe('actions', () => {
  const mockStore = mockStoreFunc();
  afterEach(() => {
    fetchMock.restore();
    mockStore.clearActions();
  });

  it('should create a thunk action', async () => {
    fetchMock.deleteOnce('http://localhost:5000/user/', {
      body: {},
      headers: {
        'Content-type': 'application/json',
      },
    });

    const expectedAction = {
      type: 'REMOVE_USER_DATA',
    };
    await mockStore.dispatch<any>(actions.deleteAndRemoveUser());
    expect(mockStore.getActions()).toContainEqual(expectedAction);
  });

  it('should not dispatch action if failed deletion', async () => {
    fetchMock.deleteOnce('http://localhost:5000/user/', {
      body: '',
      status: 400,
    });
    await mockStore.dispatch<any>(actions.deleteAndRemoveUser());
    expect(mockStore.getActions()).toEqual([]);
  });
});
