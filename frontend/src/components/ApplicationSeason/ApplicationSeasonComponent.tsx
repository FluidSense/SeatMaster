import EtikettBase from 'nav-frontend-etiketter';
import React, { Fragment } from 'react';
import { ETIKETT_YELLOW, SEASON_CLOSED, SEASON_END, SEASON_START } from './Strings';

interface IApplicationSeasonState {
  seasonStart: Date;
  seasonEnd: Date;
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

const ApplicationSeasonComponent: React.FunctionComponent<IApplicationSeasonState> = (props) => {
  const { seasonEnd, seasonStart } = props;
  const currentTime = new Date();
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
