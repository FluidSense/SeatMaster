import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import AdminApplication from '../../components/AdminApplication';
import { IApplication } from '../../components/Application';
import ApplicationOverview from '../../components/ApplicationReview/ApplicationOverview';
import { IRoom } from '../../components/ViewRooms';

describe('admin application container', () => {
  const mockStore = configureMockStore([thunk]);
  it('renders nothing correctly', () => {
    const store = mockStore({});
    const location = {};
    const wrapper = mount(
      <Provider store={store}>
        <AdminApplication modalOpen={false} location={location} />
      </Provider>);
    const overview = wrapper.find(ApplicationOverview);
    expect(overview.length).toBe(0);
  });
  it('renders correctly', () => {
    const room: IRoom = {
      id: 1,
      info: 'Haba Zoot Zoot',
      name: 'Haba',
      seats: {
        count: 0,
        seats: [],
      },
    };
    const application: IApplication = {
      status: 'NOT_FOUND',
    };
    const location = {
      application,
      rooms: [room],
    };
    const seat1 = {
      id: 'b2',
      info: 'WARNING: Seat is actually a dildo if you are brave enough',
      roomId: 2,
      user: {
        admin: false,
        email: 'email',
        fullname: 'fullname1',
        id: 2,
        masterStatus: 'goteem',
        username: 'user',
      },
    };
    const store = mockStore({ assignSeat: { seat: seat1 } });
    const wrapper = mount(
      <Provider store={store}>
        <AdminApplication modalOpen={false} location={location} />
      </Provider >);
    const overview = wrapper.find(ApplicationOverview);
    expect(overview.length).toBe(1);
  });
});
