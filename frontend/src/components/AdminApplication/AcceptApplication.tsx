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
      <KnappBase
        className="revoke-approve-btn"
        type="hoved"
        onClick={approve}
        disabled={application.seat ? false : true}
      >
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
      <KnappBase className="revoke-approve-btn" type="fare" onClick={revoke}>
        {_REVOKE_APP}
      </KnappBase>
    );
  }
  return (
  <KnappBase className="revoke-approve-btn" type="hoved" disabled={true}>
    {_APPROVE_APP}
  </KnappBase>
  );
};

export default AcceptApplication;
