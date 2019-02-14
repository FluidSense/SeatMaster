import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import React from 'react';

import App from '../../App';

describe('<App />', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<App />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
