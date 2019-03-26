import { mount, shallow } from 'enzyme';
import * as React from 'react';
import { IRoom, ISeat } from '../../components/ViewRooms/index';
import Presentational from '../../components/ViewRooms/Presentational';
import RoomLink from '../../components/ViewRooms/RoomLink';

export const mockSeat = (id: string, info: string, roomId: number) => ({
  id,
  info,
  roomId,
});

export const mockRoom = (id: number, name: string, info: string, count: number, seats: ISeat[]) =>
  ({
    id,
    info,
    name,
    seats: {
      count,
      seats,
    },
  });

describe('View Room Presentational', () => {
  const onClick = () => null;
  it('Renders nothing', () => {
    const mockEmptyList: IRoom[] = [];
    const wrapper = shallow(<Presentational rooms={mockEmptyList} onClick={onClick} />);
    const links = wrapper.find(RoomLink);
    expect(links.length).toEqual(0);
  });

  it('Renders one item', () => {
    const seat1 = mockSeat('x2', 'info', 1);
    const room1 = mockRoom(1, 'X-Wing', 'notes', 1, [seat1]);
    const wrapper = shallow(<Presentational rooms={[room1]} onClick={onClick} />);
    const links = wrapper.find(RoomLink);
    expect(links.length).toEqual(1);
  });

  it('Renders three items', () => {
    const seat1 = mockSeat('x1', 'info', 1);
    const seat2 = mockSeat('x2', 'info', 2);
    const seat3 = mockSeat('x3', 'info', 3);
    const room1 = mockRoom(1, 'X-Wing', 'notes', 1, [seat1]);
    const room2 = mockRoom(2, 'X-Vinge', 'notater', 1, [seat2]);
    const room3 = mockRoom(3, 'X-Wang', 'Nates', 1, [seat3]);
    const mockList = [room1, room2, room3];
    const wrapper = shallow(<Presentational rooms={mockList} onClick={onClick} />);
    const links = wrapper.find(RoomLink);
    expect(links.length).toEqual(3);
  });
});
