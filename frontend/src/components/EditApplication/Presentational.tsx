import { Input, SkjemaGruppe } from 'nav-frontend-skjema';
import React from 'react';
import { boolToString } from '../../utils/typeFormatter';
import { IApplication } from '../Application';
import './editApplication.css';

interface IProps {
  applications: IApplication[];
  match?: {
    params: {
      id: string;
    },
  };
}

const Presentational: React.FunctionComponent<IProps> = (props) => {
  const { applications, match } = props;

  if (!match) return null;
  const application = applications.filter(app => app.id === parseInt(match.params.id, 10))[0];

  if (!(application && application.user)) return null;
  const partnerApplication = application.partnerApplication;
  const partner = partnerApplication ? partnerApplication.user : undefined;
  const partnerName = partner ? partner.fullname : '';

  return (
    <div className="main-content">
      <SkjemaGruppe className="edit-application">
        <Input
          label="Name"
          bredde="L"
          defaultValue={application.user.fullname}
        />
        <Input
          label="Master status"
          bredde="L"
          defaultValue={application.user.masterStatus}
        />
        <Input
          label="E-Mail"
          bredde="L"
          defaultValue={application.user.email}
        />
        <Input
          label="Partner username"
          bredde="L"
          defaultValue={partnerName}
        />
        <Input
          label="Preferred room"
          bredde="L"
          defaultValue={application.preferredRoom}
        />
        <Input
          label="Seat Rollover"
          bredde="L"
          defaultValue={boolToString(application.seatRollover)}
        />
        <Input
          label="Needs"
          bredde="L"
          id="edit-needs"
          defaultValue={application.needs}
        />
        <Input
          label="Comments"
          bredde="L"
          defaultValue={application.comments}
        />
      </SkjemaGruppe>
    </div>
  );
};

export default Presentational;
