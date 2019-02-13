import EtikettBase from 'nav-frontend-etiketter';
import React from 'react';
import { ETIKETT_WARNING } from '../commonConstants';
import { IApplicationSeason } from './reducer';
import {
  _SEASON_CLOSED,
  _SEASON_END,
  _SEASON_START,
} from './strings';

interface IApplicationSeasonProps {
  applicationSeason: IApplicationSeason;
}

type validPreText = typeof _SEASON_START | typeof _SEASON_END;

const formatSeasonString = (preText: validPreText, time: Date) => {
  const day = time.getDate();
  const month = time.getMonth() + 1;
  const year = time.getFullYear();
  return `${preText} ${day}/${month}/${year}`;
};

const NavEtikett = (seasonStatus: string) => {
  return (
    <EtikettBase type={ETIKETT_WARNING}>
      {seasonStatus}
    </EtikettBase>
  );
};

const Presentational: React.FunctionComponent<IApplicationSeasonProps> = (props) => {
  if (props.applicationSeason === undefined) return null;
  const { applicationPeriodEnd, applicationPeriodStart } = props.applicationSeason;
  const currentTime = new Date();

  let t: any = '';
  if (currentTime < applicationPeriodEnd) {
    t = NavEtikett(formatSeasonString(_SEASON_END, applicationPeriodEnd));
  } else {
    t = NavEtikett(_SEASON_CLOSED);
  }
  const seasonEndComponent: JSX.Element = t;

  let p: any = '';
  if (currentTime < applicationPeriodStart) {
    p = NavEtikett(formatSeasonString(_SEASON_START, applicationPeriodStart));
  } else {
    p = null;
  }
  const seasonStartComponent: JSX.Element = p;

  return (
    <>
      {seasonStartComponent}
      {seasonEndComponent}
    </>
  );
};

export default Presentational;
