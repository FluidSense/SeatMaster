import AlertStripe from 'nav-frontend-alertstriper';
import KnappBase from 'nav-frontend-knapper';
import { Input, TextareaControlled } from 'nav-frontend-skjema';
import { Innholdstittel, Sidetittel } from 'nav-frontend-typografi';
import React from 'react';
import { Redirect } from 'react-router';
import { IMail, MailTypes } from '.';
import { IUser } from '../../API/interfaces';
import { IRoom } from '../ViewRooms';

interface IDispatchProps {
  sendMail: (mail: IMail) => void;
}

interface IStateProps {
  location: {
    recipient?: IRoom | IUser | IUser[];
    mailType?: MailTypes;
  };
  status: number;
}

interface IOwnState {
  modalOpen: boolean;
  subject: string;
  content: string;
}

type Props = IDispatchProps & IStateProps;

class Presentational extends React.Component<Props, IOwnState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      content: '',
      modalOpen: false,
      subject: '',
    };
  }

  public render() {
    const { status } = this.props;
    const { recipient } = this.props.location;
    if (!recipient || status === 200) return <Redirect to="/" />;
    return (
      <div className="main-content">
        <Sidetittel>{`Send mail to ${this.findTitle(recipient)}`}</Sidetittel>
        {status === 400 ? this.alert() : false}
        <form onSubmit={this.submitMail}>
          <Innholdstittel>Subject</Innholdstittel>
          <Input label="" onChangeCapture={this.updateSubject}/>
          <Innholdstittel>Content</Innholdstittel>
          <TextareaControlled label="" defaultValue="" onChangeCapture={this.updateContent}/>
          <KnappBase
            type="hoved"
            htmlType="submit"
          >
          Send mail
          </KnappBase>
        </form>
      </div>
    );
  }

  private updateSubject = (e: React.FormEvent) => {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    const subject = target.value;
    this.setState({ subject });
  }

  private updateContent = (e: React.FormEvent) => {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    const content = target.value;
    this.setState({ content });
  }

  private submitMail = (e: React.FormEvent) => {
    e.preventDefault();
    const { sendMail } = this.props;
    const { recipient, mailType } = this.props.location;
    const { subject, content } = this.state;
    let ids: number[] = [];
    if (recipient && mailType) {
      if ('seats' in recipient) {
        const seatedSeats = recipient.seats.seats.filter(seat => seat.user ? true : false);
        const tempIds = seatedSeats.map(seat => seat.user ? seat.user.id : 0);
        ids = tempIds.filter(Boolean);
      }
      if ('username' in recipient) ids = [recipient.id];
      if (recipient instanceof Array) ids = recipient.map(rec => rec.id);
      const mail = {
        content,
        ids,
        subject,
        type: mailType,
      };
      sendMail(mail);
    }
  }

  private findTitle = (rec: IRoom | IUser | IUser[]) => {
    let title: string = 'all students';
    if ('seats' in rec) title = rec.name;
    if ('username' in rec) title = rec.fullname;
    return title;
  }

  private alert = () => {
    return (
      <AlertStripe type="advarsel" solid={true}>
        Mailen ble ikke sendt. Forsøk igjen senere.
      </AlertStripe>
    );
  }
}

export default Presentational;
