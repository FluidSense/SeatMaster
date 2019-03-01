import { mount, shallow } from 'enzyme';
import * as React from 'react';
import { IRoom } from '../../components/ViewRooms/index';
import Presentational from '../../components/ViewRooms/Presentational';
import RoomLink from '../../components/ViewRooms/RoomLink';

export const mockRoom = (id: number, name: string, info: string, seat: number) => ({
  id,
  info,
  name,
  seat,
});

describe('View Room Presentational', () => {
  const onClick = () => null;
  it('Renders nothing', () => {
    const mockEmptyList: IRoom[] = [];
    const wrapper = shallow(<Presentational rooms={mockEmptyList} onClick={onClick} />);
    const links = wrapper.getElements()[0];
    expect(links).toEqual(null);
  });

  it('Renders one item', () => {
    const room1 = mockRoom(1, 'X-Wing', 'notes', 2);
    const wrapper = shallow(<Presentational rooms={[room1]} onClick={onClick} />);
    const links = wrapper.find(RoomLink);
    expect(links.length).toEqual(1);
  });

  it('Renders three items', () => {
    const room1 = mockRoom(1, 'X-Wing', 'notes', 2);
    const room2 = mockRoom(2, 'X-Vinge', 'notater', 4);
    const room3 = mockRoom(3, 'X-Wang', 'Nates', 5);
    const mockList = [room1, room2, room3];
    const wrapper = shallow(<Presentational rooms={mockList} onClick={onClick} />);
    const links = wrapper.find(RoomLink);
    expect(links.length).toEqual(3);
  });
});
