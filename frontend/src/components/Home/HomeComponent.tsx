import * as React from 'react';
import { Link } from 'react-router-dom';
import ApplicationSeasonContainer from '../ApplicationSeason/ApplicationSeasonContainer';
import ApplicationStatusContainer from '../ApplicationStatus/ApplicationStatusContainer';

import KnappBase from 'nav-frontend-knapper';

interface IHomeProps {
  fetchSeason: () => any;
}

export const HomeComponent: React.FunctionComponent<IHomeProps> = (props) => {
  return (
    <div>
      <h1>My status</h1>
      <ApplicationStatusContainer />
      <ApplicationSeasonContainer />
      <Link to="/application">
        <KnappBase type="hoved" htmlType="button" id="newAppButton">New application</KnappBase>
      </Link>
    </div>
  );
};

export default HomeComponent;
