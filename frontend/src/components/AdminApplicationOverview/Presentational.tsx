import { Sidetittel } from 'nav-frontend-typografi';
import React, { FunctionComponent } from 'react';
import { getAllApplications } from '../../API/calls';
import { IPostAdminApplicationForm } from '../../API/interfaces';
import { IApplication } from '../Application';
import { TitleAndSpinner } from '../LoadingPageSpinner/TitleAndSpinner';
import SearchBar, { searchBarEvent } from '../SearchBar';
import { IRoom } from '../ViewRooms';
import ApplicationLink from './ApplicationLink';
import ApproveSeated from './ApproveSeated';
import { FETCHING_APPLICATION_DATA } from './constants';
import PutOnWaitingList from './PutOnWaitingList';
import RemoveAllFromSeat from './RemoveAllFromSeat';
import { _APPLICATIONS_TITLE } from './strings';

interface IProps {
  applications: IApplication[];
  rooms: IRoom[];
  fetching: string;
  approve: (ids: number[]) => void;
  filterFunction: (event: searchBarEvent) => void;
  putWaiting: (ids: number[]) => void;
  removeFromSeat: (ids: number[]) => void;
  updateApplication: (id: number, app: IPostAdminApplicationForm) => void;
}
const title = <Sidetittel>{_APPLICATIONS_TITLE}</Sidetittel>;
const emptyPage = (filterFunction: (event: searchBarEvent) => void) => (
  <div className="main-content">
    {title}
    <SearchBar filterFunction={filterFunction} />
  </div>);
const emptyPageWithLoader = (<TitleAndSpinner title={_APPLICATIONS_TITLE} />);

const Presentational: FunctionComponent<IProps> = (props) => {
  const {
    applications,
    rooms,
    fetching,
    filterFunction,
    approve,
    putWaiting,
    removeFromSeat,
    updateApplication,
  } = props;
  if (fetching === FETCHING_APPLICATION_DATA) return emptyPageWithLoader;
  if (!applications || !applications.length) return emptyPage(filterFunction);
  const applicationList = applications.map(application => (
    <ApplicationLink key={application.id} application={application} rooms={rooms} />
  ));
  return (
    <div className="main-content">
      {title}
      <SearchBar filterFunction={filterFunction} />
      <div className="application-buttons">
        <RemoveAllFromSeat
          getAllApplications={getAllApplications}
          applications={applications}
          removeFromSeat={removeFromSeat}
          updateApplication={updateApplication}
        />
        <PutOnWaitingList putWaiting={putWaiting} applications={applications} />
        <ApproveSeated approve={approve} applications={applications} />
      </div>
      {applicationList}
    </div>
  );
};

export default Presentational;
