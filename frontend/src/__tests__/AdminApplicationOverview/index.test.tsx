import { mount, shallow } from 'enzyme';
import * as React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import AdminApplicationOverview from '../../components/AdminApplicationOverview';
import ApplicationLink from '../../components/AdminApplicationOverview/ApplicationLink';
import { mockApplication } from './Presentational.test';

describe('AdminApplicationOverview', () => {
  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);
  it('Renders nothing correctly', () => {
    const store = mockStore({
      applications: { applications: [] },
      rooms: { rooms: [] },
    });
    const wrapper = mount(
      <Provider store={store}>
        <AdminApplicationOverview />
      </Provider>);
    const links = wrapper.find(ApplicationLink);
    expect(links.length).toEqual(0);
  });

  it('Renders 1 room correctly', async () => {
    const application1 = mockApplication(1);
    const store = mockStore({
      applications: { applications: [application1] },
      rooms: { rooms: [] },
    });
    const wrapper = mount(
      <Provider store={store}>
        <Router>
          <AdminApplicationOverview />
        </Router>
      </Provider>);
    const links = wrapper.find(ApplicationLink);
    expect(links.length).toEqual(1);
  });
});
