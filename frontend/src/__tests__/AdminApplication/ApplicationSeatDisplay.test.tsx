import { shallow } from 'enzyme';
import { Input } from 'nav-frontend-skjema';
import React from 'react';
import ApplicationSeatDisplay from '../../components/AdminApplication/ApplicationSeatDisplay';
import { IRoom, ISeat } from '../../components/ViewRooms';

describe('application seat display', () => {
  it('renders null if no props', () => {
    const wrapper = shallow(<ApplicationSeatDisplay />);
    expect(wrapper.isEmptyRender()).toBeTruthy();
  });

  it('renders if both room and seat', () => {
    const seat: ISeat = {
      id: '1C',
      info: 'Is wrong number',
      roomId: 1,
    };
    const room: IRoom = {
      id: 1,
      info:'Woah',
      name:'Psyched!',
      seats: {
        count:1,
        seats: [seat],
      },
    };
    const wrapper = shallow(<ApplicationSeatDisplay seat={seat} room={room} />);
    const infoPanels = wrapper.find(Input);
    expect(infoPanels.length).toBe(2);
  });
});
