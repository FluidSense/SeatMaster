import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import fetchMock from 'fetch-mock';
import moment from 'moment';
import * as React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { SEASON_URL } from '../../API/constants';
import CreateSeason, { IState, setTime } from '../../components/CreateSeason/index';
import Presentational from '../../components/CreateSeason/Presentational';
import { timeFormatToBackend } from '../../utils/timeFormatter';

fetchMock.mock(SEASON_URL, 201);

jest.mock('../../store', () => ({
  getState: jest.fn(() => ({ oidc: { user: { id_token: 'test' } } })),
}));

describe('Create season', () => {
  const middlewares = [thunk];
  const mockStoreFactory = configureMockStore(middlewares);
  const mockStore = mockStoreFactory({ applicationSeason: {} });
  it('renders itself and children', () => {
    Date.now = jest.fn(() => new Date(Date.UTC(2017, 0, 1)).valueOf());
    const wrapper = mount(
    <Provider store={mockStore}>
      <CreateSeason match={{ params: { id:'-1' } }} location={{ season: undefined }}/>
    </Provider>);
    const season = wrapper.find(CreateSeason);
    expect(season.length).toBe(1);
    const presentational = wrapper.find(Presentational);
    expect(presentational.length).toBe(1);
  });

  it('Check if creating is available', () => {
    const wrapper = mount(
    <Provider store={mockStore}>
      <CreateSeason match={{ params: { id:'-1' } }} location={{ season: undefined }}/>
    </Provider>);
    const component = wrapper.find('_CreateSeason');
    const state: IState = component.state();
    component.setState({ fetched: true });
    const season = state.season;
    const body = JSON.stringify({
      newPeriodEnd: season.applicationPeriodEnd.format(timeFormatToBackend),
      newPeriodStart: season.applicationPeriodStart.format(timeFormatToBackend),
      newRoomEnd: season.end.format(timeFormatToBackend),
      newRoomStart: season.start.format(timeFormatToBackend),
    });
    const newSeasonButton = wrapper.find('#new-season-btn').hostNodes();
    newSeasonButton.simulate('click');
    const fetchOptions = fetchMock.lastOptions();
    expect(fetchOptions).toHaveProperty('body');
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
