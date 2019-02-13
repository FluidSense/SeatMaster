import React from 'react';
import {
  ACTION_WAITING,
  ETIKETT_GREEN,
  ETIKETT_RED,
} from './constants';
import {
  STATUS_NONE,
  STATUS_WAITING,
} from './strings';

import EtikettBase from 'nav-frontend-etiketter';

interface IApplicationStatusProps {
  status: string;
}

const Presentational: React.FunctionComponent<IApplicationStatusProps> = (props) => {
  const { status } = props;
  const statusString = status === ACTION_WAITING ? STATUS_WAITING : STATUS_NONE;
  const etikettType = status === ACTION_WAITING ? ETIKETT_GREEN : ETIKETT_RED;
  return (
    <EtikettBase
      type={etikettType}
    >
      {statusString}
    </EtikettBase>
  );
};

export default Presentational;
