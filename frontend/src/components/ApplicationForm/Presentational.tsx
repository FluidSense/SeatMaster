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

export interface IFormState {
  comments: string;
  email: string;
  name: string;
  needs: string;
  partnerUsername: string;
  preferredRoom: string;
  rank: string;
  seatRollover: boolean;
  [x: string]: boolean | string;
}

export interface IFormCheckboxStates {
  hasPartner: boolean;
  hasNeeds: boolean;
}

interface IState extends IFormState, IFormCheckboxStates {
  error: string;
  loading: boolean;
}

export class Presentational extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      comments: '',
      email: '',
      error: '',
      hasNeeds: false,
      hasPartner: false,
      loading: false,
      name: '',
      needs: '',
      partnerUsername: '',
      preferredRoom: '',
      rank: '',
      seatRollover: false,
    };
  }

  public componentDidMount() {
    this.props.getRooms();
  }

  public render() {
    const { userInformation, rooms, application } = this.props;
    const { hasPartner, hasNeeds, loading } = this.state;
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
            isAdmin={false}
            fullname={userInformation.fullname}
            email={userInformation.email}
          />
          <ApplicationFormPreferences
            isAdmin={false}
            updateApplicationFormData={this.updateApplicationFormData}
            rooms={rooms}
            hasPartner={hasPartner}
          />
          <ApplicationFormComments
            isAdmin={false}
            updateApplicationFormData={this.updateApplicationFormData}
            hasNeeds={hasNeeds}
          />
          <KnappBase
            id="submit-application"
            type="hoved"
            htmlType="submit"
            autoDisableVedSpinner={true}
            spinner={loading}
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
      comments: this.state.comments,
      needs: this.state.needs,
      partnerUsername: this.state.partnerUsername,
      preferredRoom: this.state.preferredRoom,
      seatRollover: this.state.seatRollover,
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
