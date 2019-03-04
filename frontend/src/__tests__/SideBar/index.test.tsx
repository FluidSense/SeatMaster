import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import * as React from 'react';
import Presentational from '../../components/SideBar/';

describe('Presentation SideBar', () => {
  it('Renders correctly', () => {
    const wrapper = shallow(<Presentational />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
