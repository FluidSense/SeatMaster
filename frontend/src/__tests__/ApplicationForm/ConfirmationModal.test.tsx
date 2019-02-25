import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import React from 'react';
import ConfirmationModal from '../../components/ApplicationForm/ConfirmationModal';

describe('application form confirmation modal', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<ConfirmationModal modalIsOpen={true} changeModal={jest.fn()}/>);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

});
