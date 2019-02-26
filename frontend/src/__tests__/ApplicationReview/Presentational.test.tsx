import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import React from 'react';
import Presentational from '../../components/ApplicationReview/Presentational';

const applicationInfoMock = {
  applicationStatus: 'SUBMITTED',
  email: 'test@test.com',
  fullname: 'Teser Testersen',
  partner: 'None',
  phone: '91100999',
  room: 'Space Commander',
  seatRollover: 'Yes',
  status: 'Master of masters',
};

describe('Application review presentational', () => {
  it('Renders correctly', () => {
    const wrapper = shallow(<Presentational applicationInfo={applicationInfoMock} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
