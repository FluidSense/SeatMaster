import KnappBase from 'nav-frontend-knapper';
import { Normaltekst } from 'nav-frontend-typografi';
import * as React from 'react';
import hamburger_menu from '../../assets/hamburger_menu.png';
import { isMobile } from '../../utils/layoutManager';
import { IRegisteredUserState } from '../RegisterUser/reducer';
import userManager from './../../utils/userManager';
import './header.css';

interface IStateProps {
  userInformation: IRegisteredUserState;
}

interface IDispatchProps {
  toggleSideBar: () => void;
}

type Props = IStateProps & IDispatchProps;

const loggedInAs = (name?: string) => <Normaltekst>{`Logged in as ${name}`}</Normaltekst>;

export const Presentational: React.FunctionComponent<Props> = (props) => {
  const { userInformation, toggleSideBar } = props;
  const user = isMobile
    ? null
    : loggedInAs(userInformation.fullname);
  const doLogout = (event: React.MouseEvent) => {
    event.preventDefault();
    userManager.signoutRedirect();
  };
  const onClickAction = (event: React.MouseEvent) => doLogout(event);
  return (
    // TODO: make header show userInformation.fullname when backend supports it.
    <div className="student-header">
      <img id="hamburger-menu" onClick={toggleSideBar} src={hamburger_menu}/>
      {user}
      <KnappBase
        type="flat"
        htmlType="button"
        id="logoutButton"
        onClick={onClickAction}
      >
      Log Out
      </KnappBase>
    </div>
  );
};
