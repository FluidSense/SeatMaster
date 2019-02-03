import * as React from 'react';

import { Input, SkjemaGruppe } from 'nav-frontend-skjema';

interface IProps {
  username: string;
  fullname: string;
  email: string;
  phone: string;
  status: string;
}

export const ApplicationFormPersonal: React.FunctionComponent<IProps> = (props) => {
  return (
    <SkjemaGruppe title="Personal information">
      <input type="hidden" name="username" value={props.username} />
      <Input
        label="Full name"
        bredde="XXL"
        name="fullname"
        value={props.fullname}
        disabled={true}
      />
      <Input
        label="Email"
        bredde="M"
        name="email"
        value={props.email}
        disabled={true}
      />
      <Input
        label="Phone number"
        bredde="M"
        name="phone"
        value={props.phone}
        disabled={true}
      />
      <Input
        label="Master status"
        bredde="M"
        name="status"
        value={props.status}
        disabled={true}
      />
    </SkjemaGruppe>
  );
};

export default ApplicationFormPersonal;
