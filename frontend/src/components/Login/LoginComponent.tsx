import * as React from 'react';
import { Link } from 'react-router-dom';

import KnappBase from 'nav-frontend-knapper';

interface IExampleProps {
  initAction: () => any;
}

export const LoginComponent: React.FunctionComponent<IExampleProps> = (props) => {
  return (
    <Link to="/">
      <KnappBase type="hoved" htmlType="button">Log in</KnappBase>
    </Link>
  );
};
