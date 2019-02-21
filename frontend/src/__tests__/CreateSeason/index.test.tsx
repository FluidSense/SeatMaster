import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import moment from 'moment';
import * as React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import CreateSeason, { setTime } from '../../components/CreateSeason';

const mockStore = configureMockStore();
describe('Create season', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<CreateSeason />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('Creates correct alert', () => {
    const wrapper = shallow(<CreateSeason />);
    console.log(wrapper.dive().find('#new-season-btn').html());
    // const testStripe = <AlertStripe type="advarsel" solid={true}>Test</AlertStripe>;

  });
});

describe('Test const functions', () => {
  it('Tests if moment is properly set to 23:59', () => {
    const thisMoment = moment();
    const momentMidnight = setTime(thisMoment);
    expect(thisMoment.set({ hour: 23, minute: 59 })).toEqual(momentMidnight);
  });
});
