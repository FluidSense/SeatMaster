import * as React from 'react';
import { Link } from 'react-router-dom';
import ApplicationStatusContainer from '../ApplicationStatus/ApplicationStatusContainer';

import KnappBase from 'nav-frontend-knapper';

interface IExampleProps {
  initAction: () => any;
}

export const HomeComponent: React.FunctionComponent<IExampleProps> = (props) => {
  return (
    <div>
      <h1>My status</h1>
      <ApplicationStatusContainer />
      <Link to="/application">
        <KnappBase type="hoved" htmlType="button">New application</KnappBase>
      </Link>
    </div>
  );
};

export default HomeComponent;
