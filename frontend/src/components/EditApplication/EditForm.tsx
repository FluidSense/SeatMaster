import KnappBase from 'nav-frontend-knapper';
import { Checkbox, Input, SkjemaGruppe } from 'nav-frontend-skjema';
import React from 'react';
import { IApplication } from '../Application';
import { SecureFields } from './SecureFields';

interface IProps {
  application: IApplication;
  isAdmin: boolean;
  finalize: (state: IEditState) => void;
}

export interface IEditState {
  name: string;
  masterStatus: string;
  email: string;
  partnerUsername: string;
  preferredRoom: string;
  seatRollover: boolean;
  needs: string;
  comments: string;
  [x: string]: string | boolean;
}

class EditForm extends React.Component<IProps, IEditState> {

  public render() {
    const { application, isAdmin } = this.props;
    if (!(application && application.user)) return null;
    const partnerApplication = application.partnerApplication;
    const partner = partnerApplication ? partnerApplication.user : undefined;
    const partnerName = partner ? partner.username : '';
    const secureFields = SecureFields(
      isAdmin,
      application,
      isAdmin ? this.updateApplicationFormData : undefined,
    );
    return (
      <form onSubmit={this.submitForm}>
        <SkjemaGruppe className="edit-application">
          <Input
            label="Name"
            bredde="L"
            name="name"
            value={application.user.fullname}
            disabled={true}
          />
          {secureFields}
          <Input
            label="E-Mail"
            bredde="L"
            name="email"
            value={application.user.email}
            disabled={true}
          />
          <Input
            label="Partner username"
            bredde="L"
            name="partnerUsername"
            defaultValue={partnerName}
            onChangeCapture={this.updateApplicationFormData}
          />
          <Input
            label="Preferred room"
            bredde="L"
            name="preferredRoom"
            defaultValue={application.preferredRoom}
            onChangeCapture={this.updateApplicationFormData}
          />
          <Checkbox
            label="Seat Rollover"
            name="seatRollover"
            defaultChecked={application.seatRollover}
            onChangeCapture={this.updateApplicationFormData}
          />
          <Input
            label="Needs"
            bredde="L"
            id="edit-needs"
            name="needs"
            defaultValue={application.needs}
            onChangeCapture={this.updateApplicationFormData}
          />
          <Input
            label="Comments"
            bredde="L"
            name="comments"
            defaultValue={application.comments}
            onChangeCapture={this.updateApplicationFormData}
          />
        </SkjemaGruppe>
        <KnappBase
          id="submit-application"
          type="hoved"
          htmlType="submit"
        >
          Save
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
    this.props.finalize(this.state);
  }

}

export default EditForm;
