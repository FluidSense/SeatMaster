import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import KnappBase from 'nav-frontend-knapper';
import React from 'react';
import Presentational from '../../components/AssignSeat/Presentational';
import RoomPicker from '../../components/AssignSeat/RoomPicker';
import SeatPicker from '../../components/AssignSeat/SeatPicker';
import { IRoom } from '../../components/ViewRooms';

describe('assign seat presentational', () => {
  const doNothing = () => { return; };
  const rooms: IRoom[] = [
    {
      id: 1,
      info: 'CoolerMaster',
      name: 'Coolio',
      seats: {
        count: 0,
        seats: [],
      },
    },
    {
      id: 2,
      info: 'NZXT',
      name: '420',
      seats: {
        count: 1,
        seats: [{
          id: 'bc2',
          info: 'WARNING: Seat is actually a dildo if you are brave enough',
          roomId: 2,
        }],
      },
    },
  ];
  it('renders nothing correctly', () => {
    const wrapper = shallow(<Presentational rooms={[]} assignUserToSeat={doNothing} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders correctly', () => {
    const wrapper = shallow(<Presentational rooms={rooms} assignUserToSeat={doNothing} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('submits properly', () => {
    const mockAssign = jest.fn();
    const wrapper = mount(<Presentational rooms={rooms} assignUserToSeat={mockAssign} />);
    const submitBtn = wrapper.find(KnappBase);
    submitBtn.simulate('submit');
    expect(mockAssign.mock.calls.length).toBe(0);
    wrapper.setState({ selectedSeat: { id:'B1', info:'', roomId:2 } });
    submitBtn.simulate('submit');
    expect(mockAssign.mock.calls.length).toBe(1);
  });

  it('sets state from selection', () => {
    const wrapper = mount(<Presentational rooms={rooms} assignUserToSeat={doNothing} />);
    const roomPicker = wrapper.find(RoomPicker).find('select');
    roomPicker.simulate('change', { target: { value: '2' } });
    expect(wrapper.state()).toEqual({ selectedRoom: rooms[1] });
    const seatPicker = wrapper.find(SeatPicker).find('select');
    seatPicker.simulate('change', { target: { value: 'bc2' } });
    expect(wrapper.state()).toEqual({
      selectedRoom: rooms[1],
      selectedSeat:rooms[1].seats.seats[0],
    });
  });
});
