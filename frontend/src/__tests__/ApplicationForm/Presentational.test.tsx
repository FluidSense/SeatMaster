import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import fetchMock from 'fetch-mock';
import AlertStripe from 'nav-frontend-alertstriper';
import KnappBase from 'nav-frontend-knapper';
import * as React from 'react';
import Presentational from '../../components/ApplicationForm/Presentational';
import { _ALERT_USER_ERROR, POST_FORM_DATA } from '../../components/ApplicationForm/Strings';

describe('application form', () => {
  const user = {
    username: 'Sutaba',
    fullname: 'Starbucks London',
    email: 'london@starbucks.com',
    phone: '22225555',
    status: '',
    changeModal: () => '',
  };
  it('renders alertBox correctly', () => {
    const wrapper = shallow(
      <Presentational
        username={user.username}
        fullname={user.fullname}
        email={user.email}
        phone={user.phone}
        status={user.status}
        changeModal={user.changeModal}
      />);
    const preClickAlert = wrapper.find(AlertStripe);
    expect(preClickAlert.length).toBe(0);
    wrapper.setState({ error: _ALERT_USER_ERROR });
    const alert = wrapper.find(AlertStripe);
    expect(alert.length).toBe(1);
  });

  it('renders alertbox if faulty fetch', () => {
    fetchMock.postOnce(POST_FORM_DATA, {
      status: '400',
      body: '',
      headers: 'Content-type: application/json',
    });
    const wrapper = mount(
      <Presentational
        username={user.username}
        fullname={user.fullname}
        email={user.email}
        phone={user.phone}
        status={user.status}
        changeModal={user.changeModal}
      />);
    const submit = wrapper.find(KnappBase).first();
    submit.simulate('click');
    const state = wrapper.state();
    expect(fetchMock.called(POST_FORM_DATA)).toBeTruthy();
    expect(state).toBe(1);
    const alert = wrapper.find(AlertStripe);
    expect(alert.length).toBe(1);
  });

  it('renders correctly', () => {
    const wrapper = shallow(
      <Presentational
        username={user.username}
        fullname={user.fullname}
        email={user.email}
        phone={user.phone}
        status={user.status}
        changeModal={user.changeModal}
      />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
