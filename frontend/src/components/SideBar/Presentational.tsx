import { Systemtittel } from 'nav-frontend-typografi';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { IRegisteredUserState } from '../RegisterUser/reducer';
import './sideBar.css';

interface IProps {
  userInformation: IRegisteredUserState;
}

interface IUrl {
  url: string;
  title: string;
}

const userTitle = 'User navigation';
const adminTitle = 'Administrator tools';

const userUrls: IUrl[] = [
  { url: '/', title: 'Home' },
  { url: '/application/', title: 'Application' },
  { url: '/rooms/', title: 'Room list' },
  { url: '/FAQ/', title: 'FAQ' },
  { url: '/profile/', title: 'Profile' },
];

const adminUrls: IUrl[] = [
  { url: '/admin/rooms/', title: 'Rooms' },
  { url: '/admin/create-season/', title: 'Create Season' },
  { url: '/admin/applications/', title: 'Applications' },
  { url: '/admin/students/', title: 'Students' },
];

const Presentational: React.FunctionComponent<IProps> = (props) => {
  const { userInformation } = props;

  const userUrlList = userUrls.map(url => (
    <li key={userUrls.indexOf(url)}>
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
    <li key={adminUrls.indexOf(url)}>
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
