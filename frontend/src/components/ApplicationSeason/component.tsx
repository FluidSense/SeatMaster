import EtikettBase from 'nav-frontend-etiketter';
import React from 'react';
import { IApplicationSeason } from './reducer';
import { ETIKETT_YELLOW, SEASON_CLOSED, SEASON_END, SEASON_START } from './Strings';

interface IApplicationSeasonProps {
  applicationSeason: IApplicationSeason;
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
  if (props.applicationSeason === undefined) return null;
  const { applicationPeriodEnd, applicationPeriodStart } = props.applicationSeason;
  const currentTime = new Date();
  const seasonEndComponent = currentTime < applicationPeriodEnd
    ? NavEtikett(formatSeasonString(SEASON_END, applicationPeriodEnd)) : NavEtikett(SEASON_CLOSED);
  const seasonStartComponent = currentTime < applicationPeriodStart
    ? NavEtikett(formatSeasonString(SEASON_START, applicationPeriodStart)) : null;
  return (
    <>
      {seasonStartComponent}
      {seasonEndComponent}
    </>
  );
};

export default ApplicationSeasonComponent;
