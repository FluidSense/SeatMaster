import * as React from 'react';
import { Link } from 'react-router-dom';

import KnappBase from 'nav-frontend-knapper';
import { Input, Select, SkjemaGruppe, TextareaControlled } from 'nav-frontend-skjema';

interface IProps {
  username: string;
}

export const ApplicationFormComponent: React.FunctionComponent<IProps> = (props) => {
  return (
    <form>
      <SkjemaGruppe title="Personal information">
        <Input label="Full name" bredde="XXL" disabled={true} />
        <Input label="Email" bredde="M" disabled={true} />
        <Input label="Phone number" bredde="M" disabled={true} />
      </SkjemaGruppe>
      <SkjemaGruppe title="Preferences">
        <Select label="Choose preferred room" bredde="xxl">
          <option value="big_one" key="big_one">
            Big One
          </option>
          <option value="space_commander" key="space_commander">
            Space Commander
          </option>
        </Select>
        <Input label="Partner username" />
      </SkjemaGruppe>
      <SkjemaGruppe title="Needs">
        <TextareaControlled
          label="Specify your needs"
          defaultValue=""
          maxLength={500}
          minLength={10}
        />
      </SkjemaGruppe>
      <Link to="/">
        <KnappBase type="hoved" htmlType="button" autoDisableVedSpinner={true}>Submit</KnappBase>
      </Link>
    </form>
  );
};

export default ApplicationFormComponent;
