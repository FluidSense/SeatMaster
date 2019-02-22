import KnappBase from 'nav-frontend-knapper';
import * as React from 'react';
import './header.css';
import userManager from './../../utils/userManager';

export const Header: React.FunctionComponent = (props) => {
  const doLogout = (event: React.MouseEvent) => {
    event.preventDefault();
    userManager.signoutRedirect();
  };
  const onClickAction = (event: React.MouseEvent) => doLogout(event);

  return (
    <div id="student-header">
      You're logged in as Christoffer Lofsberg
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
