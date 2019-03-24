import React from 'react';
import { IPostAdminApplicationForm } from '../../API/interfaces';
import { IApplication } from '../Application';
import './editApplication.css';
import EditForm from './EditForm';

interface IDispatchProps {
  updateApplication: (id: number, application: IPostAdminApplicationForm) => void;
}

interface IStateProps {
  applications: IApplication[];
  match?: {
    params: {
      id: string;
    },
  };
}

type Props = IStateProps & IDispatchProps;

const Presentational: React.FunctionComponent<Props> = (props) => {
  const { applications, match } = props;

  if (!match) return null;
  const application = applications.filter(app => app.id === parseInt(match.params.id, 10))[0];

  const finalize = (input: IPostAdminApplicationForm) => {
    if (application.id) props.updateApplication(application.id, input);
  };

  return (
    <div className="main-content">
    <EditForm
      application={application}
      finalize={finalize}
    />
    </div>
  );
};

export default Presentational;
