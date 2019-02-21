import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import fetchMock from 'fetch-mock';
import moment from 'moment';
import * as React from 'react';
import { POST_NEW_SEASON_URL } from '../../components/commonConstants';
import CreateSeason, { format, IState, setTime } from '../../components/CreateSeason/index';

fetchMock.mock(POST_NEW_SEASON_URL, 201);

describe('Create season', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<CreateSeason />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('Check if creating is available', () => {
    const wrapper = shallow(<CreateSeason />);
    const state: IState = wrapper.instance().state;
    const body = JSON.stringify({
      newPeriodEnd: state.periodEnd.format(format),
      newPeriodStart: state.periodStart.format(format),
      newRoomEnd: state.roomEnd.format(format),
      newRoomStart: state.roomStart.format(format),
    });
    const newSeasonButton = wrapper.dive().find('#new-season-btn');
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
