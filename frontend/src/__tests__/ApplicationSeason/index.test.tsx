import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import moment from 'moment';
import * as React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ApplicationSeason from '../../components/ApplicationSeason';

describe('ApplicationSeasonContainer', () => {
  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);
  const store = mockStore({applicationSeason: {
    applicationPeriodEnd: moment(),
    applicationPeriodStart: moment(),
    end: moment(),
    start: moment(),
  }});
  it('renders correctly', () => {
    const wrapper = mount(
    <Provider store={store} >
      <ApplicationSeason />
    </Provider>,
    );
    const container = wrapper.find(ApplicationSeason);
    expect(container.length).toBeTruthy();
    expect(toJson(container)).toMatchSnapshot();
  });
});
