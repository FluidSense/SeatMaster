import { shallow } from 'enzyme';
import { Systemtittel } from 'nav-frontend-typografi';
import * as React from 'react';
import Presentational from '../../components/SideBar/Presentational';

const userState = {
  admin: false,
  email: undefined,
  fullname: undefined,
  id: undefined,
  loading: false,
  masterStatus: undefined,
  registered: true,
  username: undefined,
};

const adminState = {
  admin: true,
  email: undefined,
  fullname: undefined,
  id: undefined,
  loading: false,
  masterStatus: undefined,
  registered: true,
  username: undefined,
};

describe('Sidebar Presentational', () => {

  it('Renders only user view', () => {
    const mockUser = userState;
    const component = shallow(<Presentational userInformation={mockUser} />);
    expect(component.find(Systemtittel).render().text()).toEqual('User navigation');
  });

  it('Renders user view and admin view', () => {
    const mockUser = adminState;
    const component = shallow(<Presentational userInformation={mockUser} />);
    expect(component.find('.user-title').render().text()).toEqual('User navigation');
    expect(component.find('.admin-title').render().text()).toEqual('Administrator tools');
  });
});
