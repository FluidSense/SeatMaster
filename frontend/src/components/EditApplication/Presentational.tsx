import AlertStripe from 'nav-frontend-alertstriper';
import { Sidetittel } from 'nav-frontend-typografi';
import React from 'react';
import { Redirect } from 'react-router';
import { IPostAdminApplicationForm } from '../../API/interfaces';
import { IApplication } from '../Application';
import { IRoom } from '../ViewRooms';
import { redirectUrl } from './constants';
import './editApplication.css';
import EditForm from './EditForm';

interface IDispatchProps {
  updateApplication: (id: number, application: IPostAdminApplicationForm) => void;
  resetStatus: () => void;
}

interface IStateProps {
  applications: IApplication[];
  matchId: string;
  rooms: IRoom[];
  status: number;
}

type Props = IStateProps & IDispatchProps;

export const editAlert = (
  <AlertStripe type="advarsel" solid={true}>
    Failed to submit the edited application. Please check your network connection
  </AlertStripe>
);

const Presentational: React.FunctionComponent<Props> = (props) => {
  const { applications, matchId, status, resetStatus, rooms } = props;

  const application = applications.filter(app => app.id === parseInt(matchId, 10))[0];

  const finalize = (input: IPostAdminApplicationForm) => {
    if (application.id) props.updateApplication(application.id, input);
  };

  if (status === 200) {
    resetStatus();
    return <Redirect to={`${redirectUrl}${matchId}`}/>;
  }

  if (!(application && application.user)) return null;
  return (
    <div className="main-content">
    <Sidetittel>{application.user.fullname}</Sidetittel>
    {status === 400 ? alert : false}
    <EditForm
      application={application}
      finalize={finalize}
      isAdmin={true}
      rooms={rooms}
    />
    </div>
  );
};

export default Presentational;
