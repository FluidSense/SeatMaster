import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import AdminApplication from '../../components/AdminApplication';
import { initUser } from '../../components/AdminApplicationOverview/reducer';
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
      applications: {
        applications: [],
      },
      rooms: {
        rooms: [],
      },
    });
    const wrapper = mount(
      <Provider store={store}>
        <Router>
          <AdminApplication modalOpen={false} match={match} />
        </Router>
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
      id: 0,
      rank: 'OTHER',
      status: APP_SUBMITTED,
      user: initUser,
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
      applications: {
        applications: [application],
      },
      assignSeat: { seat: seat1 },
      rooms: {
        rooms: [room],
      },
    });
    const wrapper = mount(
      <Provider store={store}>
       <Router>
         <AdminApplication modalOpen={false} match={match}/>
       </Router>
      </Provider >);
    expect(wrapper.isEmptyRender()).toBeFalsy();
  });
});
