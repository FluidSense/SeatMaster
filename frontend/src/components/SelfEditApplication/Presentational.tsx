import { Sidetittel } from 'nav-frontend-typografi';
import React from 'react';
import { Redirect } from 'react-router';
import { IPostApplicationForm } from '../../API/interfaces';
import { IApplication } from '../Application';
import EditForm from '../EditApplication/EditForm';
import { editAlert } from '../EditApplication/Presentational';
import { _TITLE_EDIT_APPLICATION } from './strings';

interface IDispatchProps {
  updateSelfApplication: (id: number, application: IPostApplicationForm) => void;
  resetStatus: () => void;
}

interface IStateProps {
  application: IApplication;
  status: number;
}

type Props = IDispatchProps & IStateProps;

const Presentational: React.FunctionComponent<Props> = (props) => {
  const { application, status, resetStatus, updateSelfApplication } = props;

  const finalize = (input: IPostApplicationForm) => {
    if (application.id) updateSelfApplication(application.id, input);
  };

  if (status === 200) {
    resetStatus();
    return <Redirect to="/" />;
  }

  return (
    <div className="main-content">
      <Sidetittel>{_TITLE_EDIT_APPLICATION}</Sidetittel>
      {status === 400 ? editAlert : false}
      <EditForm
        application={application}
        finalize={finalize}
        isAdmin={false}
      />
    </div>
  );
};

export default Presentational;
