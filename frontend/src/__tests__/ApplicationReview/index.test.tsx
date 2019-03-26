import { shallow } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import { IApplication } from '../../components/Application';
import ApplicationReview from '../../components/ApplicationReview/index';

const mockStoreFactory = configureMockStore();
const applicationInfoMock: IApplication = {
  id: 2,
  preferredRoom: 'Space Commander',
  rank: 'Master of masters',
  seatRollover: true,
  status: 'Master of masters',
  user: {
    admin: false,
    email: 'test@test.com',
    fullname: 'Teser Testersen',
    id: 1,
    username: 'wollawop',
  },
};

describe('Application review index', () => {
  it('Renders correctly', () => {
    const initialState = {
      applications:  { registeredApplication: applicationInfoMock },
      router: {},
      userInformation: applicationInfoMock,
    };
    const context = { router: { isActive: (a, b) => true } };
    const mockStore = mockStoreFactory(initialState);
    const wrapper = shallow(
      <Provider store={mockStore}>
        <Router>
          <ApplicationReview application={applicationInfoMock} />
        </Router>
      </Provider>,
      { context },
    ).html();
    expect(wrapper).toMatchSnapshot();
  });
});
