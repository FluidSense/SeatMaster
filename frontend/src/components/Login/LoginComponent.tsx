import * as React from 'react';
import { NavLink } from 'react-router-dom';

import KnappBase from 'nav-frontend-knapper';

interface IExampleProps {
  initAction: () => any;
}

export const LoginComponent: React.FunctionComponent<IExampleProps> = (props) => {
  return (
    <NavLink to="/">
      <KnappBase type="hoved" htmlType="button">Log in</KnappBase>
    </NavLink>
  );
};
