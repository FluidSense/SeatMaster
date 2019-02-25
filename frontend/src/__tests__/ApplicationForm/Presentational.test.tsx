import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import fetchMock from 'fetch-mock';
import AlertStripe from 'nav-frontend-alertstriper';
import KnappBase from 'nav-frontend-knapper';
import * as React from 'react';
import Presentational from '../../components/ApplicationForm/Presentational';
import { _ALERT_USER_ERROR, POST_FORM_DATA } from '../../components/ApplicationForm/Strings';
import { setTime } from '../../components/CreateSeason';

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
      body: '',
      status: '400',
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
    const btn = wrapper.find(KnappBase).first();
    expect(btn.length).toBe(1);
    btn.simulate('submit');
    expect(fetchMock.called()).toBeTruthy();
    expect(wrapper.state('loading')).toBeTruthy();
  });

  it('triggers modal if response is ok', () => {
    fetchMock.postOnce(
      POST_FORM_DATA,
      {
        body: {},
        status: '200',
      },
      {
        overwriteRoutes: true,
      });
    const changeModalMock = jest.fn();
    const wrapper = mount(
      <Presentational
        username={user.username}
        fullname={user.fullname}
        email={user.email}
        phone={user.phone}
        status={user.status}
        changeModal={changeModalMock}
      />);
    const btn = wrapper.find(KnappBase).first();
    expect(fetchMock.called()).toBeTruthy();
    btn.simulate('submit');
    expect(changeModalMock.mock.calls.length).toBe(1);
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
