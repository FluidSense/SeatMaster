import * as React from 'react';

import { Checkbox, Input, Select, SkjemaGruppe } from 'nav-frontend-skjema';

export const ApplicationFormPreferences: React.FunctionComponent<{}> = (props) => {
  return (
    <SkjemaGruppe title="Preferences">
      <Select label="Choose preferred room" bredde="xxl" name="room">
        <option value="big_one" key="big_one">
          Big One
          </option>
        <option value="space_commander" key="space_commander">
          Space Commander
          </option>
      </Select>
      <Checkbox
        label="I wish to sit with my partner"
        name="partner"
        key="partner"
      />
      <Input label="Partner username" bredde="M" name="partner_name" disabled={true} />
      <Checkbox
        label="I would like to keep my seat from the previous semester"
        name="keep_seat"
        key="keep_seat"
      />
    </SkjemaGruppe>
  );
};

export default ApplicationFormPreferences;
