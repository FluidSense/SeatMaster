import AlertStripe from 'nav-frontend-alertstriper';
import React from 'react';
import { IPostAdminApplicationForm } from '../../API/interfaces';
import { IApplication } from '../Application';
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

const Presentational: React.FunctionComponent<Props> = (props) => {
  const { applications, match, status, resetStatus } = props;

  if (!match) return null;
  const application = applications.filter(app => app.id === parseInt(match.params.id, 10))[0];

  const finalize = (input: IPostAdminApplicationForm) => {
    if (application.id) props.updateApplication(application.id, input);
  };

  const alert = (
    <AlertStripe type="advarsel" solid={true}>
      Failed to submit the edited application. Please check your network connection.
    </AlertStripe>
  );

  // TODO: Add redirect
  if (status === 200) {
    resetStatus();
    return null;
  };

  return (
    <div className="main-content">
    {status === 400 ? alert : false}
    <EditForm
      application={application}
      finalize={finalize}
    />
    </div>
  );
};

export default Presentational;
