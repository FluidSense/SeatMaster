import KnappBase from 'nav-frontend-knapper';
import React from 'react';
import { IPostAdminApplicationForm } from '../../API/interfaces';
import { IApplication } from '../Application';
import { APP_APPROVED, APP_SUBMITTED } from '../commonConstants';
import { _APPROVE_APP, _REVOKE_APP } from './strings';

interface IProps {
  application: IApplication;
  updateApplication: (id: number, application: IPostAdminApplicationForm) => void;
}

const AcceptApplication: React.FunctionComponent<IProps> = (props) => {
  const { application } = props;
  if (application.status === APP_SUBMITTED) {
    const approve = () => {
      const updated: IPostAdminApplicationForm = {
        status: APP_APPROVED,
      };
      props.updateApplication(application.id, updated);
    };
    return (
      <KnappBase type="hoved">
        {_APPROVE_APP}
      </KnappBase>
    );
  }
  if (application.status === APP_APPROVED) {
    const revoke = () => {
      const updated: IPostAdminApplicationForm = {
        status: APP_SUBMITTED,
      };
      props.updateApplication(application.id, updated);
    };
    return (
      <KnappBase type="fare">
        {_REVOKE_APP}
      </KnappBase>
    );
  }
  return null;
};

export default AcceptApplication;
