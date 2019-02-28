import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import fetchMock from 'fetch-mock';
import moment from 'moment';
import * as React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { POST_NEW_SEASON_URL } from '../../components/commonConstants';
import CreateSeason, { format, IState, setTime } from '../../components/CreateSeason/index';
import Presentational from '../../components/CreateSeason/Presentational';

fetchMock.mock(POST_NEW_SEASON_URL, 201);

describe('Create season', () => {
  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);
  const store = mockStore({ applicationSeason: {} });
  it('renders itself and children', () => {
    Date.now = jest.fn(() => new Date(Date.UTC(2017, 0, 1)).valueOf());
    const wrapper = mount(
    <Provider store={store}>
      <CreateSeason />
    </Provider>);
    const season = wrapper.find(CreateSeason);
    expect(season.length).toBe(1);
    const presentational = wrapper.find(Presentational);
    expect(presentational.length).toBe(1);
  });

  it('Check if creating is available', () => {
    const wrapper = mount(
    <Provider store={store}>
      <CreateSeason />
    </Provider>);
    const component = wrapper.find('_CreateSeason');
    const state: IState = component.state();
    const body = JSON.stringify({
      newPeriodEnd: state.periodEnd.format(format),
      newPeriodStart: state.periodStart.format(format),
      newRoomEnd: state.roomEnd.format(format),
      newRoomStart: state.roomStart.format(format),
    });
    const newSeasonButton = wrapper.find('#new-season-btn').hostNodes();
    newSeasonButton.simulate('click');
    const fetchOptions = fetchMock.lastOptions();
    expect(fetchOptions.body).toEqual(body);
  });
});

describe('Test const functions', () => {
  it('Tests if moment is properly set to 23:59', () => {
    const thisMoment = moment();
    const momentMidnight = setTime(thisMoment);
    expect(thisMoment.set({ hour: 23, minute: 59 })).toEqual(momentMidnight);
  });
});
