import { shallow } from 'enzyme';
import { Panel } from 'nav-frontend-paneler';
import React from 'react';
import ApplicationSeatDisplay from '../../components/AdminApplication/ApplicationSeatDisplay';
import { ISeat } from '../../components/Seats';
import { IRoom } from '../../components/ViewRooms';

describe('application seat display', () => {
  const doNothing = () => null;
  it('renders null if no props', () => {
    const wrapper = shallow(<ApplicationSeatDisplay removeFromSeat={doNothing} />);
    expect(wrapper.isEmptyRender()).toBeTruthy();
  });

  it('renders if both room and seat', () => {
    const seat: ISeat = {
      id: 1,
      info: 'Is wrong number',
      roomId: 1,
    };
    const room: IRoom = {
      id: 1,
      info:'Woah',
      name:'Psyched!',
      seats: {
        count: 1,
        seats: [seat],
      },
    };
    const wrapper = shallow(
      <ApplicationSeatDisplay
        removeFromSeat={doNothing}
        seat={seat}
        room={room}
      />);
    const infoPanels = wrapper.find(Panel);
    expect(infoPanels.length).toBe(2);
  });
});
