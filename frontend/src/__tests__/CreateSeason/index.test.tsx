import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import * as React from 'react';
import CreateSeason from '../../components/CreateSeason';

describe('Create season', () => {

  it('renders correctly', () => {
    const wrapper = shallow(<CreateSeason />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
