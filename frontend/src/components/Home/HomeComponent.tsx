import * as React from 'react';
import { Link } from 'react-router-dom';
import ApplicationSeason from '../ApplicationSeason';
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
      <ApplicationSeason />
      <Link to="/application">
        <KnappBase type="hoved" htmlType="button">New application</KnappBase>
      </Link>
    </div>
  );
};

export default HomeComponent;
