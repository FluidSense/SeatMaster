import { Input, SkjemaGruppe } from 'nav-frontend-skjema';
import { Undertittel } from 'nav-frontend-typografi';
import * as React from 'react';

interface IStateProps {
  fullname?: string;
  email?: string;
  status?: string;
}

export const ApplicationFormPersonal: React.FunctionComponent<IStateProps> = (props) => {
  return (
    <>
      <Undertittel>Personal information</Undertittel>
      <SkjemaGruppe className="form-personal-info">
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
      </SkjemaGruppe>
    </>
  );
};

export default ApplicationFormPersonal;
