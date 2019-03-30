import { Sidetittel } from 'nav-frontend-typografi';
import * as React from 'react';
import { UserState } from 'redux-oidc';
import { FETCHING_APPLICATION_DATA } from '../AdminApplicationOverview/constants';
import { IApplication } from '../Application';
import ApplicationAccepted from '../ApplicationAccepted';
import ApplicationReview from '../ApplicationReview';
import ApplicationSeason from '../ApplicationSeason/index';
import ApplicationStatus from '../ApplicationStatus/index';
import { APP_APPROVED, APP_WAITING } from '../commonConstants';
import LoadingPageSpinner from '../LoadingPageSpinner';
import { IRoom } from '../ViewRooms';
import { _WAITING_LIST_MESSAGE } from './strings';

interface IDispatchProps {
  fetchApplicationInformation: () => void;
  fetchRoomInfo: (id: number) => void;
}

interface IUserStates {
  oidc: UserState;
  application?: IApplication;
  rooms: IRoom[];
}

type Props = IUserStates & IDispatchProps;

const _TITLE = 'My Status';

export class Presentational extends React.Component<Props, {}> {
  public render() {
    const { application } = this.props;
    if (application && application.status === FETCHING_APPLICATION_DATA) {
      return <LoadingPageSpinner />;
    }
    const statusContent = application
      ? this.statusSpecificContent(application.status, application)
      : <ApplicationReview application={application}/>;
    return (
      <div className="main-content">
        <Sidetittel>{_TITLE}</Sidetittel>
        <ApplicationSeason />
        <ApplicationStatus />
        {statusContent}
      </div>
    );
  }

  public componentDidMount() {
    const { fetchApplicationInformation, oidc } = this.props;
    if (oidc.user && !oidc.user.expired) {
      fetchApplicationInformation();
    }
  }
  private statusSpecificContent = (status: string, application: IApplication) => {
    switch (status) {
      case APP_APPROVED:
        return (
        <ApplicationAccepted
          application={application}
          fetchRoomInfo={this.props.fetchRoomInfo}
          rooms={this.props.rooms}
        />);
      case APP_WAITING:
        return (
          <p>
            {_WAITING_LIST_MESSAGE}
          </p>
        );
      default:
        return <ApplicationReview application={application} />;

    }
  }
}

export default Presentational;
