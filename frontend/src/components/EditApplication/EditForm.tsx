import KnappBase from 'nav-frontend-knapper';
import { Checkbox, Input, SkjemaGruppe } from 'nav-frontend-skjema';
import React from 'react';
import { IApplication } from '../Application';

interface IProps {
  application: IApplication;
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
    const { application } = this.props;
    if (!(application && application.user)) return null;
    const partnerApplication = application.partnerApplication;
    const partner = partnerApplication ? partnerApplication.user : undefined;
    const partnerName = partner ? partner.fullname : '';
    return (
      <form onSubmit={this.submitForm}>
      <SkjemaGruppe className="edit-application">
        <Input
          label="Name"
          bredde="L"
          defaultValue={application.user.fullname}
          onChangeCapture={this.updateApplicationFormData}
        />
        <Input
          label="Master status"
          bredde="L"
          defaultValue={application.user.masterStatus}
          onChangeCapture={this.updateApplicationFormData}
        />
        <Input
          label="E-Mail"
          bredde="L"
          defaultValue={application.user.email}
          onChangeCapture={this.updateApplicationFormData}
        />
        <Input
          label="Partner username"
          bredde="L"
          defaultValue={partnerName}
          onChangeCapture={this.updateApplicationFormData}
        />
        <Input
          label="Preferred room"
          bredde="L"
          defaultValue={application.preferredRoom}
          onChangeCapture={this.updateApplicationFormData}
        />
        <Checkbox
          label="Seat Rollover"
          defaultChecked={application.seatRollover}
          onChangeCapture={this.updateApplicationFormData}
        />
        <Input
          label="Needs"
          bredde="L"
          id="edit-needs"
          defaultValue={application.needs}
          onChangeCapture={this.updateApplicationFormData}
        />
        <Input
          label="Comments"
          bredde="L"
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
    const value: string = eventTarget.value;
    this.setState({ [name]: value });
  }

  private submitForm = (e: React.FormEvent) => {
    e.preventDefault();
    this.props.finalize(this.state);
  }

}

export default EditForm;
