import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import * as React from 'react';
import { IApplication } from '../../API/interfaces';
import ApplicationLink from '../../components/AdminApplicationOverview/ApplicationLink';
import { mockApplication } from './Presentational.test';

describe('Renders roomlink correctly', () => {
  const app: IApplication = mockApplication(1);
  it('Renders a room link correctly', () => {
    const wrapper = shallow(<ApplicationLink application={app} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
