import { Sidetittel } from 'nav-frontend-typografi';
import React from 'react';
import { IApplication } from '../Application';
import { TitleAndSpinner } from '../LoadingPageSpinner/TitleAndSpinner';
import { IRoom } from '../ViewRooms';
import ApplicationLink from './ApplicationLink';
import ApproveSeated from './ApproveSeated';
import { FETCHING_APPLICATION_DATA } from './constants';
import { _APPLICATIONS_TITLE } from './strings';

interface IProps {
  applications: IApplication[];
  rooms: IRoom[];
  fetching: string;
  approve: (ids: number[]) => void;
}

const title = <Sidetittel>{_APPLICATIONS_TITLE}</Sidetittel>;
const emptyPage = <div className="main-content">{title}</div>;
const emptyPageWithLoader = (<TitleAndSpinner title={_APPLICATIONS_TITLE}/>);

const Presentational: React.FunctionComponent<IProps> = (props) => {
  const { applications, rooms, fetching, approve } = props;
  if (fetching === FETCHING_APPLICATION_DATA) return emptyPageWithLoader;
  if (!applications || !applications.length) return emptyPage;
  const applicationList = applications.map(application => (
    <ApplicationLink key={application.id} application={application} rooms={rooms} />
  ));
  return (
    <div className="main-content">
      <Sidetittel>
        {_APPLICATIONS_TITLE}
      </Sidetittel>
      <ApproveSeated approve={approve} applications={applications}/>
      {applicationList}
    </div>
  );
};

export default Presentational;
