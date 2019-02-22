import * as React from 'react';

import AlertStripe from 'nav-frontend-alertstriper';
import KnappBase from 'nav-frontend-knapper';
import ApplicationFormComments from './ApplicationFormComments';
import ApplicationFormPersonal from './ApplicationFormPersonal';
import ApplicationFormPreferences from './ApplicationFormPreferences';
import { _ALERT_USER_ERROR, POST_FORM_DATA } from './Strings';

interface IProps {
  username: string;
  fullname: string;
  email: string;
  phone: string;
  status: string;
  changeModal: (modalOpen: boolean) => void;
}

interface IState {
  room: string;
  partner: boolean;
  partnerUsername: string;
  needs: boolean;
  needsText: string;
  infoText: string;
  keepSeat: boolean;
  loading: boolean;
  error: string;
  [key: string]: string|boolean;
}

export class Presentational extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      error: '',
      infoText: '',
      keepSeat: false,
      loading: false,
      needs: false,
      needsText: '',
      partner: false,
      partnerUsername: '',
      room: '',
    };
  }

  public render() {
    const alertBox = this.state.error ? this.alertUser(_ALERT_USER_ERROR) : undefined;
    return (
      <>
        {alertBox}
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
          <KnappBase
            type="hoved"
            htmlType="submit"
            autoDisableVedSpinner={true}
            spinner={this.state.loading}
          >
            Submit
          </KnappBase>
        </form>
      </>
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
    this.setState({ loading: true });

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
    })
    .then((response) => {
      if (response.ok) {
        this.props.changeModal(true);
        this.setState({ loading: false, error: '' });
      }
      this.setState({ loading: false, error: _ALERT_USER_ERROR });
    })
    .catch((error) => {
      this.setState({ loading: false, error: _ALERT_USER_ERROR });
    });
  }

  private alertUser = (text: string) => (
    <AlertStripe
      type="advarsel"
      solid={true}
    >
      {text}
    </AlertStripe>
  )
}

export default Presentational;