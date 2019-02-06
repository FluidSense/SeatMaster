import * as React from 'react';

import KnappBase from 'nav-frontend-knapper';
import ApplicationFormComments from './ApplicationFormComments';
import ApplicationFormPersonal from './ApplicationFormPersonal';
import ApplicationFormPreferences from './ApplicationFormPreferences';

interface IStateProps {
  username: string;
  fullname: string;
  email: string;
  phone: string;
  status: string;
}

interface IDispatchProps {
  sendApplicationFormData: () => any;
  updateApplicationFormData: (item: React.FormEvent) => any;
}

type Props = IStateProps & IDispatchProps;

export const ApplicationFormComponent: React.FunctionComponent<Props> = (props) => {
  const { updateApplicationFormData, sendApplicationFormData } = props;
  const onSubmitForm = () => sendApplicationFormData();
  return (
    <form
      method="POST"
      action="http://192.168.99.100:5000/application/registerApplication"
      target="_blank"
      onSubmit={onSubmitForm}
    >
      <ApplicationFormPersonal
        username={props.username}
        fullname={props.fullname}
        email={props.email}
        phone={props.phone}
        status={props.status}
      />
      <ApplicationFormPreferences updateApplicationFormData={updateApplicationFormData} />
      <ApplicationFormComments updateApplicationFormData={updateApplicationFormData} />
      <KnappBase type="hoved" htmlType="submit" autoDisableVedSpinner={true}>Submit</KnappBase>
    </form>
  );
};

export default ApplicationFormComponent;
