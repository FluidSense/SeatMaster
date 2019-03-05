import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import * as React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import AdminApplicationOverview from '../../components/AdminApplicationOverview';
import { mockApplication } from './Presentational.test';

describe('ViewRoom', () => {
  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);
  const store = mockStore({
    applications: { applications: [] },
  });
  it('Renders nothing correctly', () => {
    const wrapper = mount(
      <Provider store={store}>
        <AdminApplicationOverview />
      </Provider>);
    const component = wrapper.find(AdminApplicationOverview);
    expect(toJson(component)).toMatchSnapshot();
  });

  it('Renders 1 room correctly', () => {
    const wrapper = mount(
      <Provider store={store}>
        <AdminApplicationOverview />
      </Provider>);
    const component = wrapper.find(AdminApplicationOverview);
    const application1 = mockApplication(1);
    component.setState({ applications: [application1] });
    expect(toJson(component)).toMatchSnapshot();
  });
});
