import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import AssignSeat from '../../components/AssignSeat';
import Presentational from '../../components/AssignSeat/Presentational';
import { mockApplication } from '../AdminApplicationOverview/Presentational.test';

describe('assign seat index', () =>  {
  const app = mockApplication(1);
  const mockStore = configureMockStore([thunk]);
  const store = mockStore({ rooms: { rooms: [] } });
  it('renders correctly', () => {
    const wrapper = mount(
      <Provider store={store} >
        <AssignSeat application={app}/>
      </Provider>,
    );
    const container = wrapper.find(AssignSeat);
    expect(container.length).toBe(1);
    const presentational = wrapper.find(Presentational);
    expect(presentational.length).toBe(1);
  });
});
