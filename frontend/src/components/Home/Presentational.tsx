import { Sidetittel } from 'nav-frontend-typografi';
import * as React from 'react';
import { UserState } from 'redux-oidc';
import { IApplication } from '../Application';
import ApplicationAccepted from '../ApplicationAccepted';
import ApplicationReview from '../ApplicationReview';
import ApplicationSeason from '../ApplicationSeason/index';
import ApplicationStatus from '../ApplicationStatus/index';
import { APP_APPROVED } from '../commonConstants';
import { IRoom } from '../ViewRooms';

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
    if (application && application.status === APP_APPROVED) {
      return (
        <div className="main-content">
          <Sidetittel>{_TITLE}</Sidetittel>
          <ApplicationSeason />
          <ApplicationStatus />
          <ApplicationAccepted
            application={application}
            fetchRoomInfo={this.props.fetchRoomInfo}
            rooms={this.props.rooms}
          />
        </div>
      );
    }
    return (
      <div className="main-content">
        <Sidetittel>{_TITLE}</Sidetittel>
        <ApplicationSeason />
        <ApplicationStatus />
        <ApplicationReview application={application} />
      </div>
    );
  }

  public componentDidMount() {
    const { fetchApplicationInformation, oidc } = this.props;
    if (oidc.user && !oidc.user.expired) {
      fetchApplicationInformation();
    }
  }
}

export default Presentational;
