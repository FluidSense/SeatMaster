import KnappBase from 'nav-frontend-knapper';
import { SkjemaGruppe } from 'nav-frontend-skjema';
import React from 'react';
import { IPostAdminApplicationForm } from '../../API/interfaces';
import { IApplication } from '../Application';
import ApplicationFormComments from '../ApplicationForm/ApplicationFormComments';
import ApplicationFormPersonal from '../ApplicationForm/ApplicationFormPersonal';
import ApplicationFormPreferences from '../ApplicationForm/ApplicationFormPreferences';
import { IFormCheckboxStates, IFormState } from '../ApplicationForm/Presentational';
import { IRoom } from '../ViewRooms';
import { SecureFields } from './SecureFields';
import { _EDITING_INFO_TEXT, _SAVE_BUTTON } from './strings';

interface IProps {
  application: IApplication;
  isAdmin: boolean;
  rooms: IRoom[];
  finalize: (state: IPostAdminApplicationForm) => void;
}

type State = IFormState & IFormCheckboxStates;

class EditForm extends React.Component<IProps, State> {
  constructor(props: IProps) {
    super(props);
    const { application } = props;
    const { user, partnerApplication, seatRollover, needs, comments, preferredRoom } = application;
    let partner = '';
    if (partnerApplication && partnerApplication.user) {
      partner = partnerApplication.user.username;
    }
    this.state = {
      comments: comments || '',
      email: user.email,
      hasNeeds: needs !== undefined && needs.length > 0,
      hasPartner: partner.length > 0,
      name: user.fullname,
      needs: needs || '',
      partnerUsername: partner,
      preferredRoom: preferredRoom || '',
      rank: application.rank,
      seatRollover: seatRollover || false,
    };
  }

  public render() {
    const { application, isAdmin, rooms } = this.props;
    const {
      name,
      email,
      partnerUsername,
      hasNeeds,
      hasPartner,
      preferredRoom,
      needs,
      comments,
      seatRollover,
    } = this.state;
    if (!(application && application.user)) return null;
    const secureFields = SecureFields(
      isAdmin,
      application,
      isAdmin ? this.updateApplicationFormData : undefined,
    );
    return (
      <form onSubmit={this.submitForm}>
        <p style={{ fontStyle: 'italic' }} >{_EDITING_INFO_TEXT}</p>
        <SkjemaGruppe className="edit-application">
          <ApplicationFormPersonal
            isAdmin={isAdmin}
            fullname={name}
            email={email}
          />
          {secureFields}
          <ApplicationFormPreferences
            isAdmin={isAdmin}
            updateApplicationFormData={this.updateApplicationFormData}
            rooms={rooms}
            room={preferredRoom}
            hasPartner={hasPartner}
            wantsSeatRollover={seatRollover}
            partner={partnerUsername}
          />
          <ApplicationFormComments
            isAdmin={isAdmin}
            needs={needs}
            hasNeeds={hasNeeds}
            comments={comments}
            updateApplicationFormData={this.updateApplicationFormData}
          />
        </SkjemaGruppe>
        <KnappBase
          id="submit-application"
          type="hoved"
          htmlType="submit"
        >
          {_SAVE_BUTTON}
        </KnappBase>
      </form>
    );
  }

  private updateApplicationFormData = (item: React.FormEvent) => {
    const eventTarget = item.target as HTMLFormElement;
    const name: string = eventTarget.name;
    const value: string | boolean =
      eventTarget.type === 'checkbox' ? eventTarget.checked : eventTarget.value;
    this.setState({ [name]: value });
  }

  private submitForm = (e: React.FormEvent) => {
    e.preventDefault();

    const body: IPostAdminApplicationForm = {
      comments: this.state.comments,
      needs: this.state.needs,
      partnerUsername: this.state.partnerUsername,
      preferredRoom: this.state.preferredRoom,
      rank: this.state.rank,
      seatRollover: this.state.seatRollover,
    };
    this.props.finalize(body);
  }

}

export default EditForm;
