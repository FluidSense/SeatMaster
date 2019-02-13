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
  currentTime: Date;
}

type validPreText = typeof _SEASON_START | typeof _SEASON_END;

const formatSeasonString = (preText: validPreText, time: Date) => {
  const day = time.getDate();
  const month = time.getMonth() + 1;
  const year = time.getFullYear();
  return `${preText} - ${day}/${month}/${year}`;
};

const Presentational: React.FunctionComponent<IApplicationSeasonProps> = (props) => {
  if (props.applicationSeason === undefined) return null;
  const { applicationPeriodEnd, applicationPeriodStart } = props.applicationSeason;
  const { currentTime } = props;

  let t: string = '';
  if (currentTime < applicationPeriodStart) {
    t = formatSeasonString(_SEASON_START, applicationPeriodStart);
  } else {
    t = _SEASON_OPEN;
  }
  const seasonStartText: string = t;

  let p: any = '';
  if (currentTime < applicationPeriodEnd) {
    p = formatSeasonString(_SEASON_END, applicationPeriodEnd);
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
