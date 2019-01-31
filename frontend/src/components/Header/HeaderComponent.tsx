import * as React from 'react';
import { Link } from 'react-router-dom';
import KnappBase from 'nav-frontend-knapper';

export const HeaderComponent: React.FunctionComponent = (props) => {
  return (
    <div>
      Youre logged in as Christoffer Lofsberg
      <Link to="/">
        <KnappBase type="hoved" htmlType="button">Log Out</KnappBase>
      </Link>
    </div>
  );
};
