import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import AdminApplication from '../../components/AdminApplication';
import ApplicationOverview from '../../components/ApplicationReview/ApplicationOverview';
import { IRoom } from '../../components/ViewRooms';

describe('admin application container', () => {
  it('renders nothing correctly', () => {
    const location = {};
    const wrapper = mount(<AdminApplication location={location} />);
    expect(wrapper.isEmptyRender()).toBeTruthy();
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
    const location = {
      application: {},
      rooms: [room],
    };
    const mockStore = configureMockStore([thunk]);
    const store = mockStore({});
    const wrapper = mount(
      <Provider store={store}>
        <AdminApplication location={location} />
      </Provider >);
    const overview = wrapper.find(ApplicationOverview);
    expect(overview.length).toBe(1);
  });
});
