import * as React from 'react';
import { NavLink } from 'react-router-dom';

import KnappBase from 'nav-frontend-knapper';

interface IExampleProps {
  initAction: () => any;
}

export const ApplicationComponent: React.FunctionComponent<IExampleProps> = (props) => {
  return (
    <div>
      <h1>My application</h1>
      <NavLink to="/">
        <KnappBase type="hoved" htmlType="button">Submit</KnappBase>
      </NavLink>
    </div>
  );
};
