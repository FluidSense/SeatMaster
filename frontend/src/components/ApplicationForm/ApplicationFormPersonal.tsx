import { Input, SkjemaGruppe } from 'nav-frontend-skjema';
import * as React from 'react';

interface IStateProps {
  username: string;
  fullname?: string;
  email: string;
  phone?: string;
  status: string;
}

export const ApplicationFormPersonal: React.FunctionComponent<IStateProps> = (props) => {
  return (
    <SkjemaGruppe className="form-personal-info" title="Personal information">
      <input type="hidden" name="username" value={props.username} />
      <Input
        className="input-full-name"
        label="Full name"
        bredde="L"
        name="fullname"
        value={props.fullname}
        disabled={true}
      />
      <Input
        className="input-email"
        label="Email"
        bredde="L"
        name="email"
        value={props.email}
        disabled={true}
      />
      <Input
        className="input-phone"
        label="Phone number"
        bredde="L"
        name="phone"
        value={props.phone}
        disabled={true}
      />
      <Input
        className="input-masterStatus"
        label="Master status"
        bredde="L"
        name="status"
        value={props.status}
        disabled={true}
      />
    </SkjemaGruppe>
  );
};

export default ApplicationFormPersonal;
