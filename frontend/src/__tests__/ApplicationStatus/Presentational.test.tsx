import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import EtikettBase from 'nav-frontend-etiketter';
import * as React from 'react';
import Presentational from '../../components/ApplicationStatus/Presentational';
const _APP_APPROVED = 'Your application has been accepted';
const _APP_DENIED = 'Your application has been denied';
const _APP_NOT_FOUND = 'We can&#x27;t find an application linked to you';
const _APP_SUBMITTED = 'You have submitted and account, it is currently being processed';

describe('ApplicationStatus', () => {
  it('Application approoved renders correctly', () => {
    const wrapperApprooved = shallow(<Presentational applicationStatus={'APPROVED'} />);
    expect(wrapperApprooved.find(EtikettBase).first().html()).toContain(_APP_APPROVED);
    expect(wrapperApprooved.find(EtikettBase).first().html()).toContain('suksess');
  });

  it('Application denied renders correctly', () => {
    const wrapperDenied = shallow(<Presentational applicationStatus={'DENIED'} />);
    expect(wrapperDenied.find(EtikettBase).first().html()).toContain(_APP_DENIED);
    expect(wrapperDenied.find(EtikettBase).first().html()).toContain('advarsel');
  });

  it('Application submitted renders correctly', () => {
    const wrapperSubmitted = shallow(<Presentational applicationStatus={'SUBMITTED'} />);
    expect(wrapperSubmitted.find(EtikettBase).first().html()).toContain(_APP_SUBMITTED);
    expect(wrapperSubmitted.find(EtikettBase).first().html()).toContain('suksess');
  });

  it('Application not found renders correctly', () => {
    const wrapperNotFound = shallow(<Presentational applicationStatus={'NOT_FOUND'} />);
    expect(wrapperNotFound.find(EtikettBase).first().html()).toContain(_APP_NOT_FOUND);
    expect(wrapperNotFound.find(EtikettBase).first().html()).toContain('advarsel');
  });
});
