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
  const { applicationPeriodEnd, applicationPeriodStart } = props.applicationSeason;
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
