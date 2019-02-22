import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import ApplicationReview from '../../components/ApplicationReview/index';

const mockStore = configureMockStore();
const applicationInfoMock = {
  email: 'test@test.com',
  fullname: 'Teser Testersen',
  partner: 'None',
  phone: '91100999',
  room: 'Space Commander',
  seatRollover: 'Yes',
  status: 'Master of masters',
};

describe('Application review index', () => {
  it('Renders correctly', () => {
    const initialState = { userInformation: applicationInfoMock };
    const store = mockStore(initialState);
    const wrapper = shallow(
      <Provider store={store}>
        <ApplicationReview />
      </Provider>,
    ).html();
    expect(wrapper).toMatchSnapshot();
  });
});
