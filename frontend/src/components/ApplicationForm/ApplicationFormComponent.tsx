import * as React from 'react';
import { Link } from 'react-router-dom';

import KnappBase from 'nav-frontend-knapper';
import { Checkbox, Input, Select, SkjemaGruppe, TextareaControlled } from 'nav-frontend-skjema';

interface IProps {
  fullname: string;
  email: string;
  phone: string;
}

export const ApplicationFormComponent: React.FunctionComponent<IProps> = (props) => {
  return (
    <form method="POST" action="http://192.168.99.100:5000/registerApplication" target="_blank">
      <SkjemaGruppe title="Personal information">
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
      </SkjemaGruppe>
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
        <Input label="Partner username" bredde="M" disabled={true} />
        <Checkbox
          label="I would like to keep my seat from the previous semester"
          name="keep_seat"
          key="keep_seat"
        />
      </SkjemaGruppe>
      <SkjemaGruppe title="Needs">
        <Checkbox label="I have needs for my seat" name="needs" key="needs" />
        <TextareaControlled
          label="Specify your needs"
          defaultValue=""
          maxLength={500}
          minLength={10}
          disabled={true}
        />
      </SkjemaGruppe>
      <KnappBase type="hoved" htmlType="submit" autoDisableVedSpinner={true}>Submit</KnappBase>
    </form>
  );
};

export default ApplicationFormComponent;
