import { Input, SkjemaGruppe } from 'nav-frontend-skjema';
import { Undertittel } from 'nav-frontend-typografi';
import * as React from 'react';
import { _LABEL_EMAIL, _LABEL_NAME, _PERSONAL_SUB_TITLE } from './strings';

interface IStateProps {
  fullname?: string;
  email?: string;
  status?: string;
  isAdmin: boolean;
}

const title = <Undertittel>{_PERSONAL_SUB_TITLE}</Undertittel>;

export const ApplicationFormPersonal: React.FunctionComponent<IStateProps> = (props) => {
  const subTitle = props.isAdmin ? null : title;
  return (
    <div>
      {subTitle}
      <SkjemaGruppe className="form-personal-info">
        <Input
          className="input-full-name"
          label={_LABEL_NAME}
          bredde="XL"
          name="fullname"
          value={props.fullname}
          disabled={true}
        />
        <Input
          className="input-email"
          label={_LABEL_EMAIL}
          bredde="XL"
          name="email"
          value={props.email}
          disabled={true}
        />
      </SkjemaGruppe>
    </div>
  );
};

export default ApplicationFormPersonal;
