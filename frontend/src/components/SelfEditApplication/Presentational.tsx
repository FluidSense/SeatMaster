import { Sidetittel } from 'nav-frontend-typografi';
import React from 'react';
import { Redirect } from 'react-router';
import { IPostApplicationForm } from '../../API/interfaces';
import { FETCHING_APPLICATION_DATA } from '../AdminApplicationOverview/constants';
import { IApplication } from '../Application';
import ApplicationSeason from '../ApplicationSeason';
import ApplicationStatus from '../ApplicationStatus';
import EditForm from '../EditApplication/EditForm';
import { editAlert } from '../EditApplication/Presentational';
import { _STATUS_TITLE } from '../Home/Presentational';
import { IRoom } from '../ViewRooms';
import { _TITLE_EDIT_APPLICATION } from './strings';

interface IDispatchProps {
  updateApplication: (application: IPostApplicationForm) => void;
  resetStatus: () => void;
}

interface IStateProps {
  application?: IApplication;
  status: number;
  rooms: IRoom[];
}

type Props = IDispatchProps & IStateProps;

const Presentational: React.FunctionComponent<Props> = (props) => {
  const {
    application,
    resetStatus,
    rooms,
    status,
    updateApplication,
  } = props;
  if (!application) return <Redirect to="/" />;
  if (status === 200 || application.status === FETCHING_APPLICATION_DATA) {
    resetStatus();
    return <Redirect to="/" />;
  }
  const finalize = (input: IPostApplicationForm) => {
    if (application.id) updateApplication(input);
  };

  return (
    <div className="main-content">
      <Sidetittel>{_STATUS_TITLE}</Sidetittel>
      <ApplicationSeason />
      <ApplicationStatus />
      <Sidetittel>{_TITLE_EDIT_APPLICATION}</Sidetittel>
      {status === 400 ? editAlert : false}
      <EditForm
        rooms={rooms}
        application={application}
        finalize={finalize}
        isAdmin={false}
      />
    </div>
  );
};

export default Presentational;
