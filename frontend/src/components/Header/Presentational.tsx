import KnappBase from 'nav-frontend-knapper';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { IRegisteredUserState } from '../RegisterUser/reducer';
import userManager from './../../utils/userManager';
import './header.css';

interface IProps {
  userInformation: IRegisteredUserState;
}

export const Presentational: React.FunctionComponent<IProps> = (props) => {
  const { userInformation } = props;

  const doLogout = (event: React.MouseEvent) => {
    event.preventDefault();
    userManager.signoutRedirect();
  };
  const onClickAction = (event: React.MouseEvent) => doLogout(event);

  return (
    // TODO: make header show userInformation.fullname when backend supports it.
    <div id="student-header">
      You're logged in as {userInformation.fullname}
      <KnappBase
        type="hoved"
        htmlType="button"
        id="logoutButton"
        onClick={onClickAction}
      >
      Log Out
      </KnappBase>
    </div>
  );
};
