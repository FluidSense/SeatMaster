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
import ConfirmationModal from './ConfirmationModal';
import { _ALERT_USER_ERROR, _SUBMIT_BUTTON } from './strings';

interface IProps {
  userInformation: IRegisteredUserState;
  rooms: IRoom[];
  application?: IApplication;
  changeModal: () => void;
  modalIsOpen: boolean;
  getRooms: () => void;
  setApplication: (application: IApplication) => void;
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
    const { userInformation, rooms, application, modalIsOpen, changeModal } = this.props;
    const { hasPartner, hasNeeds, loading, seatRollover } = this.state;
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
            wantsSeatRollover={seatRollover}
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
        </form>
        <KnappBase
          id="submit-application"
          type="hoved"
          htmlType="submit"
          autoDisableVedSpinner={true}
          spinner={loading}
          onClick={changeModal}
        >
          {_SUBMIT_BUTTON}
        </KnappBase>
        <ConfirmationModal
          modalIsOpen={modalIsOpen}
          changeModal={changeModal}
          accept={this.onSubmitForm}
        />
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

  private onSubmitForm = () => {
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
        (result) => {
          this.props.setApplication(result);
          this.props.changeModal();
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
