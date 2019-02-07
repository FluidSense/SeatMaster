import * as React from 'react';

import { Checkbox, Input, Select, SkjemaGruppe } from 'nav-frontend-skjema';

interface IProps {
  updateApplicationFormData: (item: React.FormEvent) => any;
}

export const ApplicationFormPreferences: React.FunctionComponent<IProps> = (props) => {
  const { updateApplicationFormData } = props;
  const onUpdateForm = (item: React.FormEvent) => updateApplicationFormData(item);
  return (
    <SkjemaGruppe title="Preferences">
      <Select
        label="Choose preferred room"
        bredde="xxl"
        name="room"
        defaultValue="initial"
        onChangeCapture={onUpdateForm}
      >
        <option disabled={true} value="initial" hidden={true} >Select room</option>
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
        onChangeCapture={onUpdateForm}
      />
      <Input
        label="Partner username"
        bredde="M"
        name="partner_name"
        key="partner_name"
        disabled={true}
        onChangeCapture={onUpdateForm}
      />
      <Checkbox
        label="I would like to keep my seat from the previous semester"
        name="keep_seat"
        key="keep_seat"
        onChangeCapture={onUpdateForm}
      />
    </SkjemaGruppe>
  );
};

export default ApplicationFormPreferences;
