import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import fetchMock from 'fetch-mock';
import * as React from 'react';
import { POST_NEW_ROOM_URL } from '../../components/commonConstants';
import CreateRoom from '../../components/CreateRoom/index';

describe('Create room functions', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<CreateRoom />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('Updates roomName state through onchange', () => {
    const component = shallow(<CreateRoom />);
    const name = 'X-Wing';
    const inputName = component.dive().find('#input-room-name');
    inputName.simulate('change', { target: { value: name } });
    expect(component.state('roomName')).toEqual(name);
  });

  it('Updates roomNotes state through onchange', () => {
    const component = shallow(<CreateRoom />);
    const notes = 'These are some notes, bro';
    const inputNotes = component.dive().find('#input-room-notes');
    inputNotes.simulate('change', { target: { value: notes } });
    expect(component.state('roomNotes')).toEqual(notes);
  });

  it('Fetches with correct body', () => {
    fetchMock.mock(POST_NEW_ROOM_URL, 201);
    const component = shallow(<CreateRoom />);
    const submitButton = component.dive().find('#create-room-button');
    const newState = {
      ...component.state(),
      roomName: 'X-Wing',
      roomNotes: 'Notes',
    };
    component.setState(newState);
    const jsonBody = JSON.stringify({
      info: component.state('roomNotes'),
      name: component.state('roomName'),
    });
    submitButton.simulate('click');
    const fetchOptions = fetchMock.lastOptions();
    expect(fetchOptions.body).toEqual(jsonBody);
  });
});

describe('Create Room life cycle', () => {
  it('Update state and check if button is enabled', () => {
    const wrapper = shallow(<CreateRoom />) as any;
    const newState = {
      ...wrapper.state(),
      roomName: 'X-Wing',
      roomNotes: 'Notes',
    };
    wrapper.setState(newState);
    expect(wrapper.state('buttonDisabled')).toEqual(false);
  });
});
