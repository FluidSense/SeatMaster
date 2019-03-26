import { Input, Select } from 'nav-frontend-skjema';
import React from 'react';
import { IApplication } from '../Application';
import { MASTER_STATUS } from './constants';

const options = MASTER_STATUS.map((status, index) => {
  return <option key={index} value={status}>{status}</option>;
});

export const SecureFields = (
  isAdmin: boolean,
  application: IApplication,
  update?: (item: React.FormEvent) => void,
  ) => {
  if (!(application && application.user)) return null;
  if (isAdmin && update) {
    return (
      <>
        <Select
          label="Master status"
          name="rank"
          defaultValue={application.rank}
          onChangeCapture={update}
        >
          {options}
        </Select>
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
