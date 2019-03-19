import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import React from 'react';
import { IApplication } from '../../components/Application';
import Presentational from '../../components/ApplicationReview/Presentational';
import { IRegisteredUserState } from '../../components/RegisterUser/reducer';

const applicationInfoMock: IApplication = {
  comments: 'These are some comments',
  id: 1,
  needs: 'Tehse are some needs',
  preferredRoom: 'X-Wing',
  seatRollover: true,
  status: 'APP_NOT_FOUND',
  user: {
    email: 'Test@testersen.com',
    fullname: 'Teser Testersen',
    id: 2,
    masterStatus: 'Poor',
    username: 'tst.tsx',
  },
};

const userInfoMock: IRegisteredUserState = {
  loading: false,
  registered: true,
};

describe('Application review presentational', () => {
  it('Renders correctly', () => {
    const wrapper = shallow(
      <Presentational application={applicationInfoMock} userInfo={userInfoMock} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
