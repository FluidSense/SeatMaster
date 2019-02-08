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
  partnerUsername: string;
  needs: boolean;
  needsText: string;
  infoText: string;
  keepSeat: boolean;
  [key: string]: string|boolean;
}

export class ApplicationFormComponent extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      infoText: '',
      keepSeat: false,
      needs: false,
      needsText: '',
      partner: false,
      partnerUsername: '',
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

  private onSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();

    fetch(POST_FORM_DATA, {
      body: JSON.stringify({
        infoText: this.state.infoText,
        keepSeat: this.state.keepSeat,
        needsText: this.state.needsText,
        partnerUsername: this.state.partnerUsername,
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
