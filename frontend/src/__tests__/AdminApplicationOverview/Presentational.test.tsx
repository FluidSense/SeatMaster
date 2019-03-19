import { shallow } from 'enzyme';
import * as React from 'react';
import { IApplication, IUser } from '../../API/interfaces';
import ApplicationLink from '../../components/AdminApplicationOverview/ApplicationLink';
import Presentational from '../../components/AdminApplicationOverview/Presentational';

const defaultUser = {
  id: 1,
  username: 'Kek',
};

export const mockApplication = (
  id: number,
  user: IUser = defaultUser,
  comments: string = '',
  needs: string = '',
  status: string = 'SUBMITTED',
): IApplication => ({
  comments,
  id,
  needs,
  status,
  user,
});

describe('AdminApplicationOverview Presentational', () => {
  it('Renders nothing', () => {
    const mockEmptyList: IApplication[] = [];
    const wrapper = shallow(<Presentational applications={mockEmptyList} />);
    const links = wrapper.find(ApplicationLink);
    expect(links.length).toEqual(0);
  });

  it('Renders one item', () => {
    const application1 = mockApplication(1);
    const wrapper = shallow(<Presentational applications={[application1]} />);
    const links = wrapper.find(ApplicationLink);
    expect(links.length).toEqual(1);
  });

  it('Renders three items', () => {
    const app1 = mockApplication(1);
    const app2 = mockApplication(2);
    const app3 = mockApplication(3);
    const mockList = [app1, app2, app3];
    const wrapper = shallow(<Presentational applications={mockList} />);
    const links = wrapper.find(ApplicationLink);
    expect(links.length).toEqual(3);
  });
});
