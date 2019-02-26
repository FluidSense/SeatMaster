import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import * as React from 'react';
import ViewRoom from '../../components/ViewRooms';
import { mockRoom } from './Presentational.test';

describe('ViewRoom', () => {
  it('Renders nothing correctly', () => {
    const wrapper = shallow(<ViewRoom />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('Renders 1 room correctly', () => {
    const wrapper = shallow(<ViewRoom />);
    const room1 = mockRoom(1, 'X-Wing', 'Dis be notes, mon', 2);
    wrapper.setState({ rooms: [room1] });
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
