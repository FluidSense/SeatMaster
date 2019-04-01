import AlertStripe from 'nav-frontend-alertstriper';
import KnappBase from 'nav-frontend-knapper';
import * as React from 'react';
import { Redirect } from 'react-router';
import { postApplicationForm } from '../../API/calls';
import { IApplication } from '../Application';
import { IRegisteredUserState } from '../RegisterUser/reducer';
import { IRoom } from '../ViewRooms';
import ApplicationFormComments from './ApplicationFormComments';
import ApplicationFormPersonal from './ApplicationFormPersonal';
import ApplicationFormPreferences from './ApplicationFormPreferences';
import { _ALERT_USER_ERROR, _SUBMIT_BUTTON } from './strings';

interface IProps {
  userInformation: IRegisteredUserState;
  rooms: IRoom[];
  application?: IApplication;
  changeModal: (modalOpen: boolean) => void;
  getRooms: () => void;
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
  [key: string]: string | boolean | IRoom | undefined;
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

  public componentDidMount() {
    this.props.getRooms();
  }

  public render() {
    const { userInformation, application } = this.props;
    const alertBox = this.state.error ? this.alertUser(_ALERT_USER_ERROR) : undefined;
    if (application) return <Redirect to="/" />;
    return (
      <>
        {alertBox}
        <form
          onSubmit={this.onSubmitForm}
          id="new-application-form"
        >
          <p style={{ fontStyle: 'italic' }}>
            Additional information about your courses at NTNU
            will be gathered for the purpose of finding your master status.
          </p>
          <ApplicationFormPersonal
            fullname={userInformation.fullname}
            email={userInformation.email}
          />
          <ApplicationFormPreferences
            updateApplicationFormData={this.updateApplicationFormData}
            partner={this.state.partner}
            rooms={this.props.rooms}
          />
          <ApplicationFormComments
            updateApplicationFormData={this.updateApplicationFormData}
            needs={this.state.needs}
          />
          <KnappBase
            id="submit-application"
            type="hoved"
            htmlType="submit"
            autoDisableVedSpinner={true}
            spinner={this.state.loading}
          >
            {_SUBMIT_BUTTON}
          </KnappBase>
        </form>
      </>
    );
  }

  private updateApplicationFormData = (item: React.FormEvent) => {
    const eventTarget = item.target as HTMLFormElement;
    const name: string = eventTarget.name;
    const value: string | boolean =
      eventTarget.type === 'checkbox' ? eventTarget.checked : eventTarget.value;
    this.setState({ [name]: value });
  }

  private onSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    this.setState({ loading: true });

    postApplicationForm({
      comments: this.state.infoText,
      needs: this.state.needs ? this.state.needsText : '',
      partnerUsername: this.state.partnerUsername,
      preferredRoom: this.state.room,
      seatRollover: this.state.keepSeat,
    })
      .then(
        // On fullfilled promise:
        () => {
          this.props.changeModal(true);
          this.setState({ loading: false, error: '' });
        },
        // On rejected promise:
        () => {
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
