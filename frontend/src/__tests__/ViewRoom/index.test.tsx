import { mount } from 'enzyme';
import * as React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ViewRoom from '../../components/ViewRooms';
import RoomLink from '../../components/ViewRooms/RoomLink';
import { mockRoom } from './Presentational.test';

describe('ViewRoom', () => {
  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);
  const history = { push: () => null };
  it('Renders nothing correctly', () => {
    const store = mockStore({
      rooms: { rooms: [] },
    });
    const wrapper = mount(
      <Provider store={store}>
        <ViewRoom history={history} />
      </Provider>);
    const links = wrapper.find(RoomLink);
    expect(links.length).toEqual(0);
  });

  it('Renders one room correctly', () => {
    const room1 = mockRoom(1, 'name', 'info', 0, []);
    const store = mockStore({
      rooms: { rooms: [room1] },
    });
    const wrapper = mount(
      <Provider store={store}>
        <Router>
          <ViewRoom history={history} />
        </Router>
      </Provider>);
    const links = wrapper.find(RoomLink);
    expect(links.length).toEqual(1);
  });
});
