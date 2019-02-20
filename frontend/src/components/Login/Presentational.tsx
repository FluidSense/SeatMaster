import * as React from 'react';
import { Link } from 'react-router-dom';
import userManager from './../../utils/userManager';

import KnappBase from 'nav-frontend-knapper';

interface ILoginProps {
  fetchUserData: (userId: number) => any;
}

export const Presentational: React.FunctionComponent<ILoginProps> = (props) => {
  const doLogin = (event: React.MouseEvent) => {
    event.preventDefault();
    userManager.signinRedirect();
  };
  const onClickAction = (event: React.MouseEvent) => doLogin(event);
  return (
    <div className="main-content">
      <h1>
        Welcome!
      </h1>
      <p>
        This is your portal for applying for designated seats at the
        Department of Computer Science (IDI).
      </p>
      <p>
        Click the button to login using FEIDE.
      </p>
      <Link to="/home">
        <KnappBase
          type="hoved"
          htmlType="button"
          onClick={onClickAction}
          id="loginButton"
        >
          Log in
        </KnappBase>
      </Link>
    </div>
  );
};
