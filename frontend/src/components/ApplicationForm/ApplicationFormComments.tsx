import * as React from 'react';

import { Checkbox, SkjemaGruppe, TextareaControlled } from 'nav-frontend-skjema';

export const ApplicationFormComments: React.FunctionComponent<{}> = (props) => {
  return (
    <SkjemaGruppe title="Needs">
      <Checkbox label="I have needs for my seat" name="needs" key="needs" />
      <TextareaControlled
        label="Specify your needs"
        defaultValue=""
        maxLength={500}
        minLength={10}
        name="needs"
        disabled={true}
      />
      <TextareaControlled
        label="Additional comments"
        defaultValue=""
        maxLength={500}
        minLength={10}
        name="comments"
      />
    </SkjemaGruppe>
  );
};

export default ApplicationFormComments;
