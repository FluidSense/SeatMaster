import * as React from 'react';

import { Checkbox, SkjemaGruppe, TextareaControlled } from 'nav-frontend-skjema';
import { Undertittel } from 'nav-frontend-typografi';

interface IProps {
  updateApplicationFormData: (item: React.FormEvent) => any;
  needs: boolean;
}

export const ApplicationFormComments: React.FunctionComponent<IProps> = (props) => {
  const { updateApplicationFormData } = props;
  const onUpdateForm = (item: React.FormEvent) => updateApplicationFormData(item);
  return (
    <>
      <Undertittel>Needs</Undertittel>
      <SkjemaGruppe>
        <Checkbox
          label="I have needs for my seat"
          name="needs"
          key="needs"
          onChangeCapture={onUpdateForm}
        />
        <TextareaControlled
          label="Specify your needs (NOTE: Only fill out this field if your needs are imperative)"
          defaultValue=""
          maxLength={500}
          minLength={10}
          name="needsText"
          key="needsText"
          disabled={!props.needs ? true : false}
          onChangeCapture={onUpdateForm}
        />
        <TextareaControlled
          label="Additional comments"
          defaultValue=""
          maxLength={500}
          name="infoText"
          key="infoText"
          onChangeCapture={onUpdateForm}
        />
      </SkjemaGruppe>
    </>
  );
};

export default ApplicationFormComments;
