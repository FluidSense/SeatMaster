import AlertStripe from 'nav-frontend-alertstriper';
import KnappBase from 'nav-frontend-knapper';
import * as React from 'react';
import { postApplicationForm } from '../../API/calls';
import { IRegisteredUserState } from '../RegisterUser/reducer';
import { IRoom } from '../ViewRooms';
import ApplicationFormComments from './ApplicationFormComments';
import ApplicationFormPersonal from './ApplicationFormPersonal';
import ApplicationFormPreferences from './ApplicationFormPreferences';

import { _ALERT_USER_ERROR } from './Strings';

interface IProps {
  userInformation: IRegisteredUserState;
  rooms: IRoom[];
  changeModal: (modalOpen: boolean) => void;
  getRooms: () => void;
}

interface IState {
  room?: IRoom;
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
      room: undefined,
    };
  }

  public componentDidMount() {
    this.props.getRooms();
  }

  public render() {
    const { userInformation } = this.props;
    const alertBox = this.state.error ? this.alertUser(_ALERT_USER_ERROR) : undefined;
    return (
      <>
        {alertBox}
        <form
          onSubmit={this.onSubmitForm}
          id="new-application-form"
        >
          <ApplicationFormPersonal
            fullname={userInformation.fullname}
            email={userInformation.email}
            status={userInformation.masterStatus}
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
            Submit
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
      preferredRoom: this.state.room ? this.state.room.name : this.state.room,
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
