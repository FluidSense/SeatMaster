import * as React from 'react';

import { Checkbox, SkjemaGruppe, TextareaControlled } from 'nav-frontend-skjema';

interface IStateProps {
  updateApplicationFormData: (item: React.FormEvent) => any;
}

export const ApplicationFormComments: React.FunctionComponent<IStateProps> = (props) => {
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
        disabled={true}
        onChangeCapture={onUpdateForm}
      />
      <TextareaControlled
        label="Additional comments"
        defaultValue=""
        maxLength={500}
        minLength={10}
        name="comments"
        onChangeCapture={onUpdateForm}
      />
    </SkjemaGruppe>
  );
};

export default ApplicationFormComments;
