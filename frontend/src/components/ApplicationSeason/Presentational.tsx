import { Moment } from 'moment';
import EtikettBase from 'nav-frontend-etiketter';
import React from 'react';
import { ETIKETT_FOCUS, ETIKETT_INFO } from '../commonConstants';
import { IApplicationSeason, IApplicationSeasonState } from './reducer';
import {
  _SEASON_CLOSED,
  _SEASON_END,
  _SEASON_OPEN,
  _SEASON_START,
} from './strings';

interface IApplicationSeasonProps {
  applicationSeason?: IApplicationSeason;
  currentDate: Moment;
}

const Presentational: React.FunctionComponent<IApplicationSeasonProps> = (props) => {
  const { applicationSeason } = props;
  if (!applicationSeason) {
    return (
      <div id="season-info">
        <EtikettBase type={ETIKETT_FOCUS}>{_SEASON_CLOSED}</EtikettBase>
      </div>);
  }
  const { applicationPeriodEnd, applicationPeriodStart } = applicationSeason;
  const { currentDate } = props;

  const startText = currentDate < applicationPeriodStart ? _SEASON_START : _SEASON_OPEN;
  const endText = currentDate < applicationPeriodEnd ? _SEASON_END : _SEASON_CLOSED;

  const start = (
    <EtikettBase type={ETIKETT_INFO}>
      {`${startText} - ${applicationPeriodStart.format('D/M/YYYY')}`}
    </EtikettBase>);
  const startEtikett = currentDate <= applicationPeriodEnd ? start : false;

  return (
    <div id="season-info">
      {startEtikett}
      <EtikettBase type={ETIKETT_INFO}>
        {`${endText} - ${applicationPeriodEnd.format('D/M/YYYY')}`}
      </EtikettBase>
    </div>
  );
};

export default Presentational;
