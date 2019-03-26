import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import * as React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import AdminRoom from '../../components/AdminRoom/index';

describe('Admin room functions', () => {
  const location = { room: undefined };
  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);
  const store = mockStore({
    adminRoom: { error: undefined, submitted: undefined },
    rooms: { rooms: [] },
  });
  const mountProvider = () => (mount(
    <Provider store={store}><AdminRoom location={location} /></Provider>));

  it('renders correctly without rooms', () => {
    const wrapper = mountProvider();
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('Updates roomName state through onchange', () => {
    const wrapper = mountProvider();
    const component = wrapper.find(AdminRoom);
    const name = 'X-Wing';
    const inputName = component.find('#input-room-name').hostNodes();
    inputName.simulate('change', { target: { value: name } });
    const state = component.children().state();
    expect(state.room.name).toEqual(name);
  });

  it('Updates roomNotes state through onchange', () => {
    const wrapper = mountProvider();
    const component = wrapper.find(AdminRoom);
    const notes = 'These are some notes, bro';
    const inputNotes = component.find('#input-room-notes').hostNodes();
    inputNotes.simulate('change', { target: { value: notes } });
    const state = component.children().state();
    expect(state.room.info).toEqual(notes);
  });

  it('Renders correctly when room as prop', () => {
    const location2 = {
      room: {
        id: 64,
        info: 'wasd',
        name: 'qwerty',
        seats: { count: 0, seats: [] },
      },
    };
    const wrapper = shallow(
      <Provider store={store}><AdminRoom location={location2} /></Provider>);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});

describe('Admin Room life cycle', () => {
  const location = { room: undefined };
  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);
  const store = mockStore({
    adminRoom: { error: undefined, submitted: undefined },
    rooms: { room: [] },
  });

  it('Update state and check if button is enabled', () => {
    const wrapper = mount(
      <Provider store={store}>
        <AdminRoom location={location} />
      </Provider>);
    const newState = {
      ...wrapper.state(),
      roomName: 'X-Wing',
      roomNotes: 'Notes',
    };
    wrapper.setState(newState);
    const component = wrapper.find(AdminRoom);
    const state = component.children().state();
    expect(state.buttonDisabled).toEqual(true);
  });
});
