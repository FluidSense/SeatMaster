import * as React from 'react';
import {   Link } from 'react-router-dom';

import KnappBase from 'nav-frontend-knapper';

interface ILoginProps {
  fetchUserData: (userId: number) => any;
}

export const LoginComponent: React.FunctionComponent<ILoginProps> = (props) => {
  const { fetchUserData } = props;
  const onClickAction = () => fetchUserData(1);
  return (
    <div>
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
