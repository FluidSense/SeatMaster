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
  currentDate: Moment;
}

const Presentational: React.FunctionComponent<IApplicationSeasonProps> = (props) => {
  if (props.applicationSeason === undefined) return null;
  const { applicationPeriodEnd, applicationPeriodStart } = props.applicationSeason;
  const { currentDate } = props;

  const startText = currentDate < applicationPeriodStart ? _SEASON_START : _SEASON_OPEN;
  const endText = currentDate < applicationPeriodEnd ? _SEASON_END : _SEASON_CLOSED;

  return (
    <>
      <EtikettBase type={ETIKETT_INFO}>
        {`${startText} - ${applicationPeriodStart.format('D/M/YYYY')}`}
      </EtikettBase>
      <EtikettBase type={ETIKETT_INFO}>
        {`${endText} - ${applicationPeriodEnd.format('D/M/YYYY')}`}
      </EtikettBase>
    </>
  );
};

export default Presentational;
