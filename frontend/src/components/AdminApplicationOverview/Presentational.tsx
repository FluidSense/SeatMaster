import { Sidetittel } from 'nav-frontend-typografi';
import React, { FunctionComponent } from 'react';
import { IApplication } from '../Application';
import { TitleAndSpinner } from '../LoadingPageSpinner/TitleAndSpinner';
import Modal from '../Modal';
import SearchBar, { searchBarEvent } from '../SearchBar';
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
  filterFunction: (event: searchBarEvent) => void;
}
const title = <Sidetittel>{_APPLICATIONS_TITLE}</Sidetittel>;
const emptyPage = (filterFunction: (event: searchBarEvent) => void) => (
  <div className="main-content">
    {title}
    <SearchBar filterFunction={filterFunction}/>
</div>);
const emptyPageWithLoader = (<TitleAndSpinner title={_APPLICATIONS_TITLE}/>);

const Presentational: FunctionComponent<IProps> = (props) => {
  const { applications, rooms, fetching, filterFunction, approve } = props;
  if (fetching === FETCHING_APPLICATION_DATA) return emptyPageWithLoader;
  if (!applications || !applications.length) return emptyPage(filterFunction);
  const applicationList = applications.map(application => (
    <ApplicationLink key={application.id} application={application} rooms={rooms} />
    ));
  return (
    <div className="main-content">
      <Sidetittel>
        {_APPLICATIONS_TITLE}
      </Sidetittel>
      <ApproveSeated
        applications={applications}
        approve={approve}
      />
      <SearchBar filterFunction={filterFunction}/>
      {applicationList}
    </div>
  );
};

export default Presentational;
