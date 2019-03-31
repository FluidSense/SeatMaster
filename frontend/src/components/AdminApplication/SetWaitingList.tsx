import KnappBase from 'nav-frontend-knapper';
import React from 'react';
import { IPostAdminApplicationForm } from '../../API/interfaces';
import { IApplication } from '../Application';
import { APP_SUBMITTED, APP_WAITING } from '../commonConstants';
import { ISeat } from '../Seats';
import { _NO_WAIT, _WAIT_APP } from './strings';

interface IProps {
  seat?: ISeat;
  application: IApplication;
  updateApplication: (id: number, app: IPostAdminApplicationForm) => void;
}

const SetWaitingList: React.FunctionComponent<IProps> = (props) => {
  const { seat, updateApplication, application } = props;

  const update = () => {
    const app = application.status === APP_SUBMITTED
    ? { status: APP_WAITING }
    : { status: APP_SUBMITTED };
    updateApplication(application.id, app);
  };
  const conditionalClass = `${seat && application.status !== APP_WAITING
    ? ''
    : 'waiting-list-button'} revoke-approve-btn`;
  return (
    <KnappBase
      type="hoved"
      onClick={update}
      disabled={seat && application.status !== APP_WAITING ? true : false}
      className={conditionalClass}
    >
      {application.status === APP_SUBMITTED ? _WAIT_APP : _NO_WAIT}
    </KnappBase>
  );
};

export default SetWaitingList;
