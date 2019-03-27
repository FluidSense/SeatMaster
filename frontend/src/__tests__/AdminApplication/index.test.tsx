import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import AdminApplication from '../../components/AdminApplication';
import { IApplication } from '../../components/Application';
import ApplicationOverview from '../../components/ApplicationReview/ApplicationOverview';
import { APP_NOT_FOUND, APP_SUBMITTED } from '../../components/commonConstants';
import { IRoom } from '../../components/ViewRooms';

describe('admin application container', () => {
  const mockStore = configureMockStore([thunk]);
  const match = { params: { id: '1' } };
  const noApplication = { status: APP_NOT_FOUND };
  it('renders nothing correctly', () => {
    const store = mockStore({
      adminReviewApplication: { application: noApplication, api: { status: 0 } },
      applications: [],
      rooms: [],
    });
    const location = {};
    const wrapper = mount(
      <Provider store={store}>
        <AdminApplication modalOpen={false} location={location} match={match} />
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
      status: APP_SUBMITTED,
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
    const store = mockStore({
      adminReviewApplication: {
        api: { status: 0 },
        application: { status: APP_SUBMITTED },
      },
      applications: [application],
      assignSeat: { seat: seat1 },
      rooms: [room],
    });
    const wrapper = mount(
      <Provider store={store}>
        <AdminApplication modalOpen={false} location={location} match={match}/>
      </Provider >);
    expect(wrapper.isEmptyRender()).toBeFalsy();
  });
});
