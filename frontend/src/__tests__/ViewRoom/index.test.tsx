import { shallow } from 'enzyme';
import * as React from 'react';
import ViewRoom from '../../components/ViewRooms';

describe('ViewRoom', () => {
  it('Renders correctly', () => {
    const wrapper = shallow(<ViewRoom />);
    expect(wrapper.html()).toMatchSnapshot();
  });
});
