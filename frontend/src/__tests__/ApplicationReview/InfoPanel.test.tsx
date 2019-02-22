import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import React from 'react';
import InfoPanel from '../../components/ApplicationReview/InfoPanel';

describe('InfoPanel', () => {
  it('renders correctly', () => {
    const wrapper = shallow(
      <InfoPanel title={'This is a title'} text={'This is a text'} />,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
