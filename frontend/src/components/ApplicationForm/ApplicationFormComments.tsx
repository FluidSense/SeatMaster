import { Checkbox, SkjemaGruppe, TextareaControlled } from 'nav-frontend-skjema';
import { Undertittel } from 'nav-frontend-typografi';
import * as React from 'react';
import {
  _ADMIN_LABEL_NEEDS,
  _CHECKBOX_NEEDS,
  _LABEL_COMMENTS,
  _LABEL_NEEDS,
  _NEEDS_SUB_TITLE,
} from './strings';

interface IProps {
  updateApplicationFormData: (item: React.FormEvent) => any;
  needs?: string;
  hasNeeds: boolean;
  comments?: string;
  isAdmin: boolean;
}

const title = <Undertittel>{_NEEDS_SUB_TITLE}</Undertittel>;

export const ApplicationFormComments: React.FunctionComponent<IProps> = (props) => {
  const { updateApplicationFormData, hasNeeds, isAdmin } = props;
  const comments = props.comments || '';
  const needsText = props.needs || '';
  const subTitle = isAdmin ? null : title;
  const onUpdateForm = (item: React.FormEvent) => updateApplicationFormData(item);
  const needsLabel = isAdmin ? _ADMIN_LABEL_NEEDS : _LABEL_NEEDS;
  const needsCheckbox = isAdmin ? null : (
    <Checkbox
      label={_CHECKBOX_NEEDS}
      name="hasNeeds"
      checked={hasNeeds}
      key="hasNeeds"
      onChangeCapture={onUpdateForm}
    />
  );
  return (
    <div className="form-needs-info">
      {subTitle}
      <SkjemaGruppe>
        {needsCheckbox}
        <TextareaControlled
          label={needsLabel}
          defaultValue={needsText}
          maxLength={500}
          minLength={10}
          name="needs"
          key="needs"
          disabled={!hasNeeds}
          onChangeCapture={onUpdateForm}
        />
        <TextareaControlled
          label={_LABEL_COMMENTS}
          defaultValue={comments}
          maxLength={500}
          name="comments"
          key="comments"
          onChangeCapture={onUpdateForm}
        />
      </SkjemaGruppe>
    </div>
  );
};

export default ApplicationFormComments;
