import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import KnappBase from 'nav-frontend-knapper';
import React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Presentational from '../../components/AssignSeat/Presentational';
import RoomPicker from '../../components/AssignSeat/RoomPicker';
import SeatPicker from '../../components/AssignSeat/SeatPicker';
import { IRoom, ISeat } from '../../components/ViewRooms';

describe('assign seat presentational', () => {
  const doNothing = () => { return; };
  const checkSeatMock = (room: IRoom, seatId: ISeat) => toggleModal();
  // const assignSeatMock = (room: IRoom, seatId: ISeat) => toggleModal();
  let modalOpen = false;
  const toggleModal = () => modalOpen = !modalOpen;
  const accept = () => null;
  const seat1 = {
    id: 'b2',
    info: 'WARNING: Seat is actually a dildo if you are brave enough',
    roomId: 2,
    user: {
      admin: false,
      email: 'email',
      fullname: 'fullname1',
      id: 2,
      masterStatus: 'goteem',
      username: 'user',
    },
  };
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
        count: 2,
        seats: [
          seat1,
          {
            id: 'b3',
            info: 'some new room',
            roomId: 1,
          }],
      },
    },
  ];
  const mockStore = configureMockStore([thunk]);
  const store = mockStore({ assignSeat: { seat: seat1 } });
  it('renders nothing correctly', () => {
    const wrapper = shallow(
      <Presentational
        accept={accept}
        assignUserToSeat={doNothing}
        checkSeat={checkSeatMock}
        modalOpen={modalOpen}
        rooms={[]}
        toggleModal={toggleModal}
      />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders correctly', () => {
    const wrapper = mount(
      <Provider store={store}>
        <Presentational
          accept={accept}
          assignUserToSeat={doNothing}
          checkSeat={checkSeatMock}
          modalOpen={modalOpen}
          rooms={rooms}
          toggleModal={toggleModal}
        />
      </Provider>);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('submits properly', () => {
    const mockAssign = jest.fn();
    const wrapper = mount(
      <Presentational
        accept={accept}
        assignUserToSeat={mockAssign}
        checkSeat={checkSeatMock}
        modalOpen={modalOpen}
        rooms={rooms}
        toggleModal={toggleModal}
      />);
    const submitBtn = wrapper.find(KnappBase);
    submitBtn.simulate('submit');
    expect(mockAssign.mock.calls.length).toBe(0);
    wrapper.setState({ selectedSeat: { id: 'B1', info: '', roomId: 2 } });
    submitBtn.simulate('submit');
    expect(mockAssign.mock.calls.length).toBe(1);
  });

  it('sets state from selection', () => {
    const wrapper = mount(
      <Presentational
        accept={accept}
        assignUserToSeat={doNothing}
        checkSeat={checkSeatMock}
        modalOpen={modalOpen}
        rooms={rooms}
        toggleModal={toggleModal}
      />);
    const roomPicker = wrapper.find(RoomPicker).find('select');
    roomPicker.simulate('change', { target: { value: '2' } });
    expect(wrapper.state()).toEqual({
      selectedRoom: rooms[1],
    });
    const seatPicker = wrapper.find(SeatPicker).find('select');
    seatPicker.simulate('change', { target: { value: 'bc2' } });
    expect(wrapper.state()).toEqual({
      selectedRoom: rooms[1],
    });
  });
});
