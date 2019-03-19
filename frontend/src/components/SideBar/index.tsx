import { Systemtittel } from 'nav-frontend-typografi';
import React from 'react';
import { NavLink } from 'react-router-dom';
import './sideBar.css';

interface IUrl {
  url: string;
  title: string;
}

const pageTitle = 'Navigation';

const adminUrls: IUrl[] = [
  { url: '/admin/', title: 'Admin' },
  { url: '/admin/rooms/', title: 'Rooms' },
  { url: '/admin/create-season/', title: 'Create Season' },
  { url: '/admin/applications', title: 'Applications' },
  { url: '/faq', title: 'FAQ' },
  { url: '/rooms', title: 'Rooms' },
];

const Presentational: React.FunctionComponent<{}> = (props) => {
  const urls = adminUrls.map(url => (
    <li key={adminUrls.indexOf(url)}>
      <NavLink to={url.url} exact={true}>
        {url.title}
      </NavLink>
    </li>));
  return (
    <div id="admin-side-bar">
      <nav>
        <Systemtittel>{pageTitle}</Systemtittel>
        <ul id="nav-list">
          {urls}
        </ul>
      </nav>
    </div>
  );
};

export default Presentational;
