import { mount } from 'enzyme';
import fetchMock from 'fetch-mock';
import moment from 'moment';
import * as React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { DELETE_USER_URL } from '../../API/constants';
import Profile from '../../components/Profile/index';
import Presentational from '../../components/Profile/Presentational';

fetchMock.mock(DELETE_USER_URL, 200);

jest.mock('../../store', () => ({
  getState: jest.fn(() => ({ oidc: { user: { id_token: 'test' }, isLoadingUser: false } })),
}));

describe('Profile page', () => {
  const middlewares = [thunk];
  const mockStoreFactory = configureMockStore(middlewares);
  const mockStore = mockStoreFactory({ oidc: { isLoadingUser: false }, userInformation: {} });
  it('renders itself and children', () => {
    const wrapper = mount(
      <Provider store={mockStore}>
        <Profile />
      </Provider>);
    const component = wrapper.find(Profile);
    expect(component.length).toBe(1);
    const presentational = wrapper.find(Presentational);
    expect(presentational.length).toBe(1);
  });

  it('renders button to delete', () => {
    const wrapper = mount(
      <Provider store={mockStore}>
        <Profile />
      </Provider>);
    const component = wrapper.find('.modalButton');
    expect(component.length).toBe(2);
  });

  it('renders modal on delete', () => {
    const wrapper = mount(
      <Provider store={mockStore}>
        <Profile />
      </Provider>);
    const button = wrapper.find('.modalButton').hostNodes();
    button.simulate('click');
    expect(wrapper.find('.deletionModal').length).toBe(4);
  });
});
