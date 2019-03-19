import { LenkepanelBase } from 'nav-frontend-lenkepanel';
import { Element } from 'nav-frontend-typografi';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { IApplication } from '../Application';
import { APP_APPROVED, APP_DENIED, APP_SUBMITTED } from '../commonConstants';
import { ROUTE_TO } from './constants';
import { _LINK_APP_STATUS, _LINK_MASTER_STATUS, _LINK_NAME_TITLE } from './strings';

interface IProps {
  application: IApplication;
}

const applicationStatus = (status: string) => {
  switch (status) {
    case APP_SUBMITTED: return 'Waiting list';
    case APP_APPROVED: return 'Has seat';
    case APP_DENIED: return 'Has no seat';
  }
};

const ApplicationLink: React.FunctionComponent<IProps> = (props) => {
  const { application } = props;
  const user = application.user;
  if (!user) return null;
  const status = applicationStatus(application.status);
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
      href={`${ROUTE_TO}${application.id}`}
    >
      <div className="application-link">
        <div className="link-name"><Element>{_LINK_NAME_TITLE}</Element>{user.username}</div>
        <div className="link-master"><Element>{_LINK_MASTER_STATUS}</Element>{'Status'}</div>
        <div className="link-status"><Element>{_LINK_APP_STATUS}</Element>{status}</div>
      </div>
    </LenkepanelBase>
  );
};

export default ApplicationLink;
