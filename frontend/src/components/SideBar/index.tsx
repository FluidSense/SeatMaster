import { Systemtittel } from 'nav-frontend-typografi';
import React from 'react';
import { NavLink } from 'react-router-dom';
import './sideBar.css';

const adminUrls: string[] = [
  '/admin/',
  '/admin/rooms/',
  '/admin/create-season/',
];

const Presentational: React.FunctionComponent<{}> = (props) => {
  const urls = adminUrls.map(url => (
    <li key={adminUrls.indexOf(url)}>
      <NavLink to={url} exact={true}>
        {url}
      </NavLink>
    </li>));
  return (
    <div id="admin-side-bar">
      <nav>
        <Systemtittel>Navigation</Systemtittel>
        <ul id="nav-list">
          {urls}
        </ul>
      </nav>
    </div>
  );
};

export default Presentational;
