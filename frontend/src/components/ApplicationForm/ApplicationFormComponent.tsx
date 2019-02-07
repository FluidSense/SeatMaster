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
  comments: string;
  keep_seat: boolean;
  [key: string]: string|boolean;
}

export class ApplicationFormComponent extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      comments: '',
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
        <ApplicationFormPreferences updateApplicationFormData={this.updateApplicationFormData} />
        <ApplicationFormComments updateApplicationFormData={this.updateApplicationFormData} />
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
        comments: this.state.comments,
        keep_seat: this.state.keep_seat,
        needs: this.state.needs,
        needs_text: this.state.needs_text,
        partner: this.state.partner,
        partner_name: this.state.partner_name,
        room: this.state.room,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });
  }
}

export default ApplicationFormComponent;
