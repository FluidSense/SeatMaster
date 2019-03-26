import KnappBase from 'nav-frontend-knapper';
import * as React from 'react';
import Logo_Ntnu from '../../assets/Logo-Ntnu.svg';
import userManager from '../../utils/userManager';
import './login.css';

export const Login: React.FunctionComponent<{}> = (props) => {
  const doLogin = (event: React.MouseEvent) => {
    event.preventDefault();
    userManager.signinRedirect();
  };
  const onClickAction = (event: React.MouseEvent) => doLogin(event);
  return (
    <div className="mainContent">
      <img src={Logo_Ntnu} id="ntnuLogo" />
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
      <KnappBase
        type="hoved"
        htmlType="button"
        onClick={onClickAction}
        id="loginButton"
      >
        Log in
      </KnappBase>
    </div>
  );
};
