import KnappBase from 'nav-frontend-knapper';
import * as React from 'react';
import { Link } from 'react-router-dom';

export const HeaderComponent: React.FunctionComponent = (props) => {
  return (
    <div>
      You're logged in as Christoffer Lofsberg
      <Link to="/login">
        <KnappBase type="hoved" htmlType="button" id="logoutButton">Log Out</KnappBase>
      </Link>
    </div>
  );
};
