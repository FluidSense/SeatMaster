import { shallow } from 'enzyme';
import moment from 'moment';
import EtikettBase from 'nav-frontend-etiketter';
import * as React from 'react';
import Presentational from '../../components/ApplicationSeason/Presentational';

describe('Presentation ApplicationSeason', () => {
  const today = moment();
  it('tests season start and end if date is after today season', () => {
    const soonSeason = {
      applicationPeriodEnd: moment().add(1, 'month'),
      applicationPeriodStart: moment().add(1, 'day'),
      end: moment().add(12, 'months'),
      start: moment().add(6, 'months'),
    };
    const wrapper = shallow(<Presentational applicationSeason={soonSeason} currentDate={today}/>);
    expect(wrapper.find(EtikettBase).first().html()).toContain('Open for applications');
    expect(wrapper.find(EtikettBase).last().html()).toContain('Closing for applications');
  });

  it('tests season open if date is after today season', () => {
    const startedSeason = {
      applicationPeriodEnd: moment().add(2, 'days'),
      applicationPeriodStart: moment().subtract(7, 'days'),
      end: moment().add(6, 'months'),
      start: moment().add(3, 'days'),
    };
    const wrapper = shallow(
    <Presentational
       applicationSeason={startedSeason}
       currentDate={today}
    />);
    expect(wrapper.find(EtikettBase).first().html()).toContain('Currently open for applications.');
  });

  it('tests season ended if date is after today season', () => {
    const endedSeason = {
      applicationPeriodEnd: moment().subtract(1, 'day'),
      applicationPeriodStart: moment().subtract(7, 'days'),
      end: moment().add(3, 'weeks'),
      start: moment().subtract(1, 'days'),
    };
    const wrapper = shallow(
      <Presentational
        applicationSeason={endedSeason}
        currentDate={today}
      />);
    expect(wrapper.find(EtikettBase).first().html()).toContain('Closed for applications');
  });

});
