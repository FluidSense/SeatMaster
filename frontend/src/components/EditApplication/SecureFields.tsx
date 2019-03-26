import { Input } from 'nav-frontend-skjema';
import React from 'react';
import { IApplication } from '../Application';

export const SecureFields = (
  isAdmin: boolean,
  application: IApplication,
  update?: (item: React.FormEvent) => void,
  ) => {
  if (!(application && application.user)) return null;
  if (isAdmin && update) {
    return (
      <>
        <Input
          label="Master status"
          bredde="L"
          name="masterStatus"
          defaultValue={application.rank}
          onChangeCapture={update}
        />
      </>
    );
  }
  return (
      <>
        <Input
          label="Master status"
          bredde="L"
          name="masterStatus"
          value={application.rank}
          disabled={true}
        />
      </>
  );
};
