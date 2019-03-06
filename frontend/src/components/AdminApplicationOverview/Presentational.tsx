import { Sidetittel } from 'nav-frontend-typografi';
import React from 'react';
import { IApplication } from '../Application';
import { IRoom } from '../ViewRooms';
import ApplicationLink from './ApplicationLink';
import { _APPLICATIONS_TITLE } from './strings';

interface IProps {
  applications: IApplication[];
  rooms: IRoom[];
}

const title = <Sidetittel>{_APPLICATIONS_TITLE}</Sidetittel>;

const Presentational: React.FunctionComponent<IProps> = (props) => {
  const { applications, rooms } = props;
  if (!applications || !applications.length) return <div className="main-content">{title}</div>;
  const applicationList = applications.map(application => (
    <ApplicationLink key={application.id} application={application} rooms={rooms} />
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
