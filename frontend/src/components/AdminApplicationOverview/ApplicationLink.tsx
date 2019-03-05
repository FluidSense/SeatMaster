import { LenkepanelBase } from 'nav-frontend-lenkepanel';
import { Element } from 'nav-frontend-typografi';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { IApplication } from '../../API/interfaces';
import { ROUTE_TO } from './constants';
import { _LINK_NAME_TITLE, _LINK_STATUS } from './strings';

interface IProps {
  application: IApplication;
}

const ApplicationLink: React.FunctionComponent<IProps> = (props) => {
  const { application } = props;
  const user = application.user;
  if (!user) return null;
  const link = (panelProps: any) => (
    <NavLink
      to={{ pathname: panelProps.href, application: { ...application } }}
      className="lenkepanel lenkepanel--border"
    >
      {panelProps.children}
    </NavLink>);
  return (
    <LenkepanelBase
      key={application.id}
      linkCreator={link}
      href={ROUTE_TO}
    >
      <div className="application-link">
        <div className="link-name"><Element>{_LINK_NAME_TITLE}</Element>{user.username}</div>
        <div className="link-notes"><Element>{_LINK_STATUS}</Element>{application.status}</div>
      </div>
    </LenkepanelBase>
  );
};

export default ApplicationLink;
