import React, { Component } from 'react';
import {
  ACTION_WAITING,
  ETIKETT_GREEN,
  ETIKETT_RED,
  STATUS_NONE,
  STATUS_WAITING,
} from './Strings';

import EtikettBase from 'nav-frontend-etiketter';
import { HeaderComponent } from '../Header/HeaderComponent';

interface IApplicationStatusProps {
  status: string;
}

const ApplicationStatusComponent: React.FunctionComponent<IApplicationStatusProps> = (props) => {
  const { status } = props;
  const statusString = status === ACTION_WAITING ? STATUS_WAITING : STATUS_NONE;
  const etikettType = status === ACTION_WAITING ? ETIKETT_GREEN : ETIKETT_RED;
  return (
    <div>
    <HeaderComponent />
    <EtikettBase
      type={etikettType}
    >
      {statusString}
    </EtikettBase>
    </div>
  );
};

export default ApplicationStatusComponent;
