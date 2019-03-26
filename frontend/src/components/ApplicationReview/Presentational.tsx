import KnappBase from 'nav-frontend-knapper';
import React from 'react';
import { Link } from 'react-router-dom';
import { IApplication } from '../Application';
import { APP_NOT_FOUND } from '../commonConstants';
import { IRegisteredUserState } from './../RegisterUser/reducer';
import ApplicationOverview from './ApplicationOverview';
import { _NEW_APPLICATION } from './strings';

interface IStateProps {
  application: IApplication;
  userInfo: IRegisteredUserState;
}

const Presentational: React.FunctionComponent<IStateProps> = (props) => {
  const { application } = props;

  if (application.status === APP_NOT_FOUND) {
    return (
      <Link to="/application">
        <KnappBase type="hoved" htmlType="button" id="newAppButton">{_NEW_APPLICATION}</KnappBase>
      </Link>
    );
  }
  return (
    <ApplicationOverview application={application} pathToEdit={'/edit'}/>
  );
};

export default Presentational;
