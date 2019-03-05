import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import * as React from 'react';
import RoomLink from '../../components/ViewRooms/RoomLink';

describe('Renders roomlink correctly', () => {
  const room = { id: 1, name: 'name', info: 'info', seats: { count: 1, seats: [] } };
  it('Renders a room link correctly', () => {
    const wrapper = shallow(<RoomLink room={room} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
