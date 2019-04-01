import { Systemtittel } from 'nav-frontend-typografi';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { isMobile } from '../../utils/layoutManager';
import { IRegisteredUserState } from '../RegisterUser/reducer';
import { ISideBarState } from './reducer';
import './sideBar.css';

interface IStateProps {
  userInformation: IRegisteredUserState;
  sideBar: ISideBarState;
}

interface IDispatchProps {
  toggleSideBar: () => void;
}

type Props = IStateProps & IDispatchProps;

interface IUrl {
  url: string;
  title: string;
}

const userTitle = 'User navigation';
const adminTitle = 'Administrator tools';

const userUrls: IUrl[] = [
  { url: '/', title: 'Home' },
  { url: '/rooms/', title: 'Room list' },
  { url: '/FAQ/', title: 'FAQ' },
  { url: '/profile/', title: 'Profile' },
];

const adminUrls: IUrl[] = [
  { url: '/admin/rooms/', title: 'Rooms' },
  { url: '/admin/seasons/', title: 'Application seasons' },
  { url: '/admin/applications/', title: 'Applications' },
  { url: '/admin/students/', title: 'Students' },
];

const Presentational: React.FunctionComponent<Props> = (props) => {
  const { userInformation, sideBar, toggleSideBar } = props;
  if (!sideBar.open && isMobile) return null;
  const userUrlList = userUrls.map(url => (
    <li key={userUrls.indexOf(url)} onClick={toggleSideBar}>
      <NavLink to={url.url} exact={true}>
        {url.title}
      </NavLink>
    </li>));

  if (!userInformation.admin) {
    return (
      <div id="side-bar">
        <nav>
          <Systemtittel className="user-title">{userTitle}</Systemtittel>
          <ul className="nav-list">
            {userUrlList}
          </ul>
        </nav>
      </div>
    );
  }

  const adminUrlList = adminUrls.map(url => (
    <li key={adminUrls.indexOf(url)} onClick={toggleSideBar}>
      <NavLink to={url.url} exact={true}>
        {url.title}
      </NavLink>
    </li>));

  return (
    <div id="side-bar">
      <nav>
        <Systemtittel className="user-title">{userTitle}</Systemtittel>
        <ul className="nav-list">
          {userUrlList}
        </ul>
        <Systemtittel className="admin-title">{adminTitle}</Systemtittel>
        <ul className="nav-list">
          {adminUrlList}
        </ul>
      </nav>
    </div>
  );

};

export default Presentational;
