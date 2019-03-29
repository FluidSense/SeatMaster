import AlertStripe from 'nav-frontend-alertstriper';
import { Sidetittel } from 'nav-frontend-typografi';
import React from 'react';
import { Redirect } from 'react-router';
import { IPostAdminApplicationForm } from '../../API/interfaces';
import { IApplication } from '../Application';
import { redirectUrl } from './constants';
import './editApplication.css';
import EditForm from './EditForm';

interface IDispatchProps {
  updateApplication: (id: number, application: IPostAdminApplicationForm) => void;
  resetStatus: () => void;
}

interface IStateProps {
  applications: IApplication[];
  match?: {
    params: {
      id: string;
    },
  };
  status: number;
}

type Props = IStateProps & IDispatchProps;

export const editAlert = (
  <AlertStripe type="advarsel" solid={true}>
    Failed to submit the edited application. Please check your network connection
  </AlertStripe>
);

const Presentational: React.FunctionComponent<Props> = (props) => {
  const { applications, match, status, resetStatus } = props;

  if (!match) return null;
  const application = applications.filter(app => app.id === parseInt(match.params.id, 10))[0];

  const finalize = (input: IPostAdminApplicationForm) => {
    if (application.id) props.updateApplication(application.id, input);
  };

  if (status === 200) {
    resetStatus();
    return <Redirect to={`${redirectUrl}${match.params.id}`}/>;
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
    />
    </div>
  );
};

export default Presentational;
