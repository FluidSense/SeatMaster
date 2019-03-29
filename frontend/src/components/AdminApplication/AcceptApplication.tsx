import KnappBase from 'nav-frontend-knapper';
import React from 'react';
import { IApplication } from '../Application';
import { APP_APPROVED, APP_DENIED, APP_SUBMITTED } from '../commonConstants';
import { _APPROVE_APP, _REVOKE_APP } from './strings';

interface IProps {
  application: IApplication;
}

const AcceptApplication: React.FunctionComponent<IProps> = (props) => {
  const { application } = props;
  console.log('creating accept button for', application);
  if (application.status === APP_SUBMITTED) {
    return (
      <KnappBase type="hoved">
        {_APPROVE_APP}
      </KnappBase>
    );
  }
  if (application.status === APP_APPROVED) {
    return (
      <KnappBase type="fare">
        {_REVOKE_APP}
      </KnappBase>
    );
  }
  return null;
};

export default AcceptApplication;
