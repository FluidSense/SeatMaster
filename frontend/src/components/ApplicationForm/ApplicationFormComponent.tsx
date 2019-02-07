import * as React from 'react';

import KnappBase from 'nav-frontend-knapper';
import ApplicationFormComments from './ApplicationFormComments';
import ApplicationFormPersonal from './ApplicationFormPersonal';
import ApplicationFormPreferences from './ApplicationFormPreferences';
import { POST_FORM_DATA } from './Strings';

interface IProps {
  username: string;
  fullname: string;
  email: string;
  phone: string;
  status: string;
}

interface IState {
  room: string;
  partner: boolean;
  partner_name: string;
  needs: boolean;
  needs_text: string;
  info_text: string;
  keep_seat: boolean;
  [key: string]: string|boolean;
}

export class ApplicationFormComponent extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      info_text: '',
      keep_seat: false,
      needs: false,
      needs_text: '',
      partner: false,
      partner_name: '',
      room: '',
    };
  }

  public render() {
    return (
      <form
        onSubmit={this.onSubmitForm}
      >
        <ApplicationFormPersonal
          username={this.props.username}
          fullname={this.props.fullname}
          email={this.props.email}
          phone={this.props.phone}
          status={this.props.status}
        />
        <ApplicationFormPreferences
          updateApplicationFormData={this.updateApplicationFormData}
          partner={this.state.partner}
        />
        <ApplicationFormComments
          updateApplicationFormData={this.updateApplicationFormData}
          needs={this.state.needs}
        />
        <KnappBase type="hoved" htmlType="submit" autoDisableVedSpinner={true}>Submit</KnappBase>
      </form>
    );
  }

  private updateApplicationFormData = (item: React.FormEvent) => {
    const eventTarget = item.target as HTMLFormElement;
    const name: string = eventTarget.name;
    const value: string|boolean =
      eventTarget.type === 'checkbox' ? eventTarget.checked : eventTarget.value;
    this.setState({ [name]: value });
  }

  private onSubmitForm = () => {
    fetch(POST_FORM_DATA, {
      body: JSON.stringify({
        info_text: this.state.info_text,
        keep_seat: this.state.keep_seat,
        needs_text: this.state.needs_text,
        partner_name: this.state.partner_name,
        room: this.state.room,
        username: this.props.username,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });
  }
}

export default ApplicationFormComponent;
