import * as React from 'react';

import KnappBase from 'nav-frontend-knapper';
import ApplicationFormComments from './ApplicationFormComments';
import ApplicationFormPersonal from './ApplicationFormPersonal';
import ApplicationFormPreferences from './ApplicationFormPreferences';

interface IProps {
  username: string;
  fullname: string;
  email: string;
  phone: string;
  status: string;
}

export const ApplicationFormComponent: React.FunctionComponent<IProps> = (props) => {
  return (
    <form
      method="POST"
      action="http://192.168.99.100:5000/application/registerApplication"
      target="_blank"
    >
      <ApplicationFormPersonal
        username={props.username}
        fullname={props.fullname}
        email={props.email}
        phone={props.phone}
        status={props.status}
      />
      <ApplicationFormPreferences />
      <ApplicationFormComments />
      <KnappBase type="hoved" htmlType="submit" autoDisableVedSpinner={true}>Submit</KnappBase>
    </form>
  );
};

export default ApplicationFormComponent;
