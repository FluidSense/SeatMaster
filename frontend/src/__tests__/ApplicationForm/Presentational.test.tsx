import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import fetchMock from 'fetch-mock';
import AlertStripe from 'nav-frontend-alertstriper';
import KnappBase from 'nav-frontend-knapper';
import * as React from 'react';
import Presentational from '../../components/ApplicationForm/Presentational';
import { _ALERT_USER_ERROR, POST_FORM_DATA } from '../../components/ApplicationForm/Strings';
import { IRegisteredUserState } from '../../components/RegisterUser/reducer';

jest.mock('../../store', () => ({
  getState: jest.fn(() => ({ oidc: { user: { id_token: 'test' } } })),
}));

describe('application form', () => {
  const changeModalMock = () => null;
  const user = {
    email: 'london@starbucks.com',
    fullname: 'Starbucks London',
    phone: '22225555',
    status: '',
    username: 'Sutaba',
  };
  const userInfo: IRegisteredUserState = {
    loading: false,
    registered: true,
  };
  it('renders alertBox correctly', () => {
    const wrapper = shallow(
      <Presentational
        userInformation={userInfo}
        changeModal={changeModalMock}
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
        userInformation={userInfo}
        changeModal={changeModalMock}
      />);
    const btn = wrapper.find(KnappBase).first();
    expect(btn.length).toBe(1);
    btn.simulate('submit');
    expect(fetchMock.called()).toBeTruthy();
    expect(wrapper.state('loading')).toBeTruthy();
  });

  it('triggers modal if response is ok', (callback: any) => {
    fetchMock.postOnce(
      POST_FORM_DATA,
      {
        body: {},
        status: '200',
      },
      {
        overwriteRoutes: true,
      });
    const changeModal = jest.fn();
    const wrapper = mount(
      <Presentational
        userInformation={userInfo}
        changeModal={changeModal}
      />);
    const btn = wrapper.find(KnappBase).first();
    expect.assertions(2);
    expect(fetchMock.called()).toBeTruthy();
    btn.simulate('submit');
    setTimeout(
      () => {
        expect(changeModal.mock.calls.length).toBe(1);
        callback();
      },
      100);
  });

  it('renders correctly', () => {
    const wrapper = shallow(
      <Presentational
        userInformation={userInfo}
        changeModal={changeModalMock}
      />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
