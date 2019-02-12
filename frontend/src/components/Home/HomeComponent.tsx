import * as React from 'react';
import { Link } from 'react-router-dom';
import ApplicationSeason from '../ApplicationSeason';
import ApplicationStatus from '../ApplicationStatus';

import KnappBase from 'nav-frontend-knapper';

interface IHomeProps {
  fetchSeason: () => any;
}

export const HomeComponent: React.FunctionComponent<IHomeProps> = (props) => {
  return (
    <div>
      <h1>My status</h1>
      <ApplicationStatus />
      <ApplicationSeason />
      <Link to="/application">
        <KnappBase type="hoved" htmlType="button">New application</KnappBase>
      </Link>
    </div>
  );
};

export default HomeComponent;
