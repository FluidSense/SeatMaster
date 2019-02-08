import * as React from 'react';
import { Link } from 'react-router-dom';

import KnappBase from 'nav-frontend-knapper';
import { HeaderComponent } from '../Header/HeaderComponent';

interface IExampleProps {
  initAction: () => any;
}

export const ApplicationComponent: React.FunctionComponent<IExampleProps> = (props) => {
  return (
    <div>
      <HeaderComponent />
      <h1>My application</h1>
      <Link to="/home">
        <KnappBase type="hoved" htmlType="button">Submit</KnappBase>
      </Link>
    </div>
  );
};

export default ApplicationComponent;
