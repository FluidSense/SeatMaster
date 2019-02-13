import { Moment } from 'moment';
import EtikettBase from 'nav-frontend-etiketter';
import React from 'react';
import { ETIKETT_INFO } from '../commonConstants';
import { IApplicationSeason } from './reducer';
import {
  _SEASON_CLOSED,
  _SEASON_END,
  _SEASON_OPEN,
  _SEASON_START,
} from './strings';

interface IApplicationSeasonProps {
  applicationSeason: IApplicationSeason;
  currentTime: Moment;
}

const Presentational: React.FunctionComponent<IApplicationSeasonProps> = (props) => {
  if (props.applicationSeason === undefined) return null;
  const { applicationPeriodEnd, applicationPeriodStart } = props.applicationSeason;
  const { currentTime } = props;

  let t: string = '';
  if (currentTime < applicationPeriodStart) {
    t = `${_SEASON_START} - ${applicationPeriodStart.format('D/M/YYYY')}`;
  } else {
    t = _SEASON_OPEN;
  }
  const seasonStartText: string = t;

  let p: any = '';
  if (currentTime < applicationPeriodEnd) {
    p = `${_SEASON_END} - ${applicationPeriodEnd.format('D/M/YYYY')}`;
  } else {
    p = _SEASON_CLOSED;
  }
  const seasonEndText: string = p;

  return (
    <>
      <EtikettBase type={ETIKETT_INFO}>{seasonStartText}</EtikettBase>
      <EtikettBase type={ETIKETT_INFO}>{seasonEndText}</EtikettBase>
    </>
  );
};

export default Presentational;
