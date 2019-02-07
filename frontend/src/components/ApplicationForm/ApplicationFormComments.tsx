import * as React from 'react';

import { Checkbox, SkjemaGruppe, TextareaControlled } from 'nav-frontend-skjema';

interface IProps {
  updateApplicationFormData: (item: React.FormEvent) => any;
  needs: boolean;
}

export const ApplicationFormComments: React.FunctionComponent<IProps> = (props) => {
  const { updateApplicationFormData } = props;
  const onUpdateForm = (item: React.FormEvent) => updateApplicationFormData(item);
  return (
    <SkjemaGruppe title="Needs">
      <Checkbox
        label="I have needs for my seat"
        name="needs"
        key="needs"
        onChangeCapture={onUpdateForm}
      />
      <TextareaControlled
        label="Specify your needs"
        defaultValue=""
        maxLength={500}
        minLength={10}
        name="needs_text"
        key="needs_text"
        disabled={props.needs === false ? true : false}
        onChangeCapture={onUpdateForm}
      />
      <TextareaControlled
        label="Additional comments"
        defaultValue=""
        maxLength={500}
        name="info_text"
        key="info_text"
        onChangeCapture={onUpdateForm}
      />
    </SkjemaGruppe>
  );
};

export default ApplicationFormComments;
