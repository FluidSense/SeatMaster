import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import * as React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ViewRoom from '../../components/ViewRooms';

describe('ViewRoom', () => {
  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);
  const store = mockStore({
    rooms: { rooms: [] },
  });
  const history = { push: () => null };
  it('Renders nothing correctly', () => {
    const wrapper = mount(
      <Provider store={store}>
        <ViewRoom history={history} />
      </Provider>);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
