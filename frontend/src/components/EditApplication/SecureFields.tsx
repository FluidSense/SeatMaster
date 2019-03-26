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
          label="Name"
          bredde="L"
          name="name"
          defaultValue={application.user.fullname}
          onChangeCapture={update}
        />
        <Input
          label="Master status"
          bredde="L"
          name="masterStatus"
          defaultValue={application.rank}
          onChangeCapture={update}
        />
        <Input
          label="E-Mail"
          bredde="L"
          name="email"
          defaultValue={application.user.email}
          onChangeCapture={update}
        />
      </>
    );
  }
  return (
      <>
        <Input
          label="Name"
          bredde="L"
          name="name"
          value={application.user.fullname}
          disabled={true}
        />
        <Input
          label="Master status"
          bredde="L"
          name="masterStatus"
          value={application.rank}
          disabled={true}
        />
        <Input
          label="E-Mail"
          bredde="L"
          name="email"
          value={application.user.email}
          disabled={true}
        />
      </>
  );
};
