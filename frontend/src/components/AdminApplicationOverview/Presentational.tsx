import { Sidetittel } from 'nav-frontend-typografi';
import React from 'react';
import { IRegisteredApplicationState } from './../Home/reducer';
import ApplicationLink from './ApplicationLink';
import { _APPLICATIONS_TITLE } from './strings';

interface IProps {
  applications: IRegisteredApplicationState[];
}

const Presentational: React.FunctionComponent<IProps> = (props) => {
  const { applications } = props;
  if (!applications) return null;
  if (!applications.length) return null;
  const applicationList = applications.map(application => (
    <ApplicationLink key={application.id} application={application} />
  ));
  return (
    <div className="main-content">
    <Sidetittel>
      {_APPLICATIONS_TITLE}
    </Sidetittel>
      {applicationList}
    </div>
  );
};

export default Presentational;
