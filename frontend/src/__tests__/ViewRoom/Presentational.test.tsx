import { mount, shallow } from 'enzyme';
import * as React from 'react';
import { IRoom } from '../../components/ViewRooms/index';
import Presentational from '../../components/ViewRooms/Presentational';

export const mockRoom = (id: number, name: string, info: string, seat: number) => ({
  id,
  info,
  name,
  seat,
});

describe('View Room Presentational', () => {
  it('Renders nothing', () => {
    const mockEmptyList: IRoom[] = [];
    const wrapper = shallow(<Presentational rooms={mockEmptyList} />);
    expect(wrapper.html()).toEqual('');
  });

  it('Renders one item', () => {
    const room1 = mockRoom(1, 'X-Wing', 'notes', 2);
    const wrapper = mount(<Presentational rooms={[room1]} />);
    expect(wrapper.find('.lenkepanel')).toHaveLength(1);
  });

  it('Renders three items', () => {
    const room1 = mockRoom(1, 'X-Wing', 'notes', 2);
    const room2 = mockRoom(2, 'X-Vinge', 'notater', 4);
    const room3 = mockRoom(3, 'X-Wang', 'Nates', 5);
    const mockList = [room1, room2, room3];
    const wrapper = mount(<Presentational rooms={mockList} />);
    expect(wrapper.find('.lenkepanel')).toHaveLength(3);
  });
});
