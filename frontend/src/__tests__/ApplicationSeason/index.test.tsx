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
    applicationPeriodEnd: moment('20190202'),
    applicationPeriodStart: moment('20190202'),
    end: moment('20190202'),
    start: moment('20190202'),
  }});
  // Overwrite Date.now being used by moment() to always return same value
  Date.now = jest.fn(() => new Date(Date.UTC(2017, 0, 1)).valueOf());
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
