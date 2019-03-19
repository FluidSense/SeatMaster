import { Systemtittel } from 'nav-frontend-typografi';
import React from 'react';
import { NavLink } from 'react-router-dom';
import './sideBar.css';

interface IUrl {
  url: string;
  title: string;
}

const userTitle = 'User navigation';
const adminTitle = 'Administrator tools';

const userUrls: IUrl[] = [
  { url: '/', title: 'Home' },
  { url: '/application/', title: 'Application' },
];

const adminUrls: IUrl[] = [
  { url: '/admin/', title: 'Admin' }, // TODO: Create landing page for admin
  { url: '/admin/rooms/', title: 'Rooms' },
  { url: '/admin/create-season/', title: 'Create Season' },
  { url: '/admin/applications/', title: 'Applications' },
];

const Presentational: React.FunctionComponent<{}> = () => {
  const userUrlList = userUrls.map(url => (
    <li key={userUrls.indexOf(url)}>
      <NavLink to={url.url} exact={true}>
        {url.title}
      </NavLink>
    </li>));

  const adminUrlList = adminUrls.map(url => (
    <li key={adminUrls.indexOf(url)}>
      <NavLink to={url.url} exact={true}>
        {url.title}
      </NavLink>
    </li>));

  return (
    <div id="side-bar">
      <nav>
        <Systemtittel>{userTitle}</Systemtittel>
        <ul className="nav-list">
          {userUrlList}
        </ul>
        <Systemtittel>{adminTitle}</Systemtittel>
        <ul className="nav-list">
          {adminUrlList}
        </ul>
      </nav>
    </div>
  );
};

export default Presentational;
