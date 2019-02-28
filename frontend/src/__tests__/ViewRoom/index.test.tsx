import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import * as React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ViewRoom from '../../components/ViewRooms';
import { mockRoom } from './Presentational.test';

describe('ViewRoom', () => {
  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);
  const store = mockStore({
    rooms: { rooms: [] },
  });
  it('Renders nothing correctly', () => {
    const wrapper = mount(
      <Provider store={store}>
        <ViewRoom />
      </Provider>);
    const component = wrapper.find(ViewRoom);
    expect(toJson(component)).toMatchSnapshot();
  });

  it('Renders 1 room correctly', () => {
    const wrapper = mount(
      <Provider store={store}>
        <ViewRoom />
      </Provider>);
    const component = wrapper.find(ViewRoom);
    const room1 = mockRoom(1, 'X-Wing', 'Dis be notes, mon', 2);
    component.setState({ rooms: [room1] });
    expect(toJson(component)).toMatchSnapshot();
  });
});
