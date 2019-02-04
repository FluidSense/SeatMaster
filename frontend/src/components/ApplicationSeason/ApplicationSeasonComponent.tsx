import EtikettBase from 'nav-frontend-etiketter';
import React, { Fragment } from 'react';
import { ETIKETT_YELLOW, SEASON_CLOSED, SEASON_END, SEASON_START } from './Strings';

interface IApplicationSeasonProps {
  fetchSeason: () => any;
  applicationSeason: {
    applicationPeriodEnd: string;
    applicationPeriodStart: string;
    start: string;
    end: string;
  };
}

type validPreText = typeof SEASON_START | typeof SEASON_END;

const formatSeasonString = (preText: validPreText, time: Date) => {
  const day = time.getDate();
  const month = time.getMonth() + 1;
  const year = time.getFullYear();
  return `${preText} ${day}/${month}/${year}`;
};

const NavEtikett = (seasonStatus: string) => {
  return (
    <EtikettBase
      type={ETIKETT_YELLOW}
    >
      {seasonStatus}
    </EtikettBase>
  );
};

const ApplicationSeasonComponent: React.FunctionComponent<IApplicationSeasonProps> = (props) => {
  const { fetchSeason } = props;
  fetchSeason();
  if (props.applicationSeason === undefined) return null;
  const { applicationPeriodEnd, applicationPeriodStart } = props.applicationSeason;
  const currentTime = new Date();
  const seasonStart = new Date(applicationPeriodStart);
  const seasonEnd = new Date(applicationPeriodEnd);
  const seasonEndComponent = currentTime < seasonEnd
    ? NavEtikett(formatSeasonString(SEASON_END, seasonEnd)) : NavEtikett(SEASON_CLOSED);
  const seasonStartComponent = currentTime < seasonStart
    ? NavEtikett(formatSeasonString(SEASON_START, seasonStart)) : null;
  return(
    <Fragment>
      {seasonStartComponent}
      {seasonEndComponent}
    </Fragment>
  );
};

export default ApplicationSeasonComponent;
