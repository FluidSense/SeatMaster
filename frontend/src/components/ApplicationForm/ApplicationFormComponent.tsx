import * as React from 'react';

import KnappBase from 'nav-frontend-knapper';
import ApplicationFormComments from './ApplicationFormComments';
import ApplicationFormPersonal from './ApplicationFormPersonal';
import ApplicationFormPreferences from './ApplicationFormPreferences';
import { POST_FORM_DATA } from './Strings';

interface IStateProps {
  username: string;
  fullname: string;
  email: string;
  phone: string;
  status: string;
}

interface IFormStateProps {
  room: string;
  partner: boolean;
  partner_name: string;
  needs: boolean;
  needs_text: string;
  comments: string;
  keep_seat: boolean;
}

interface IDispatchProps {
  sendApplicationFormData: () => any;
  updateApplicationFormData: (item: React.FormEvent) => any;
}

type Props = IStateProps & IFormStateProps & IDispatchProps;

export const ApplicationFormComponent: React.FunctionComponent<Props> = (props) => {
  const { updateApplicationFormData, sendApplicationFormData } = props;

  const onSubmitForm = () => {
    fetch(POST_FORM_DATA, {
      body: JSON.stringify({
        comments: props.comments,
        keep_seat: props.keep_seat,
        needs: props.needs,
        needs_text: props.needs_text,
        partner: props.partner,
        partner_name: props.partner_name,
        room: props.room,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });
  };

  return (
    <form
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
