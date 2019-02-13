import React from 'react';
import { ETIKETT_SUCCESS, ETIKETT_WARNING } from '../commonConstants';
import { APP_BEING_PROCESSED } from '../Login/constants';
import { _STATUS_NONE, _STATUS_WAITING } from './strings';

import EtikettBase from 'nav-frontend-etiketter';

interface IApplicationStatusProps {
  applicationStatus: string;
}

const Presentational: React.FunctionComponent<IApplicationStatusProps> = (props) => {
  const { applicationStatus } = props;
  const statusString = applicationStatus === APP_BEING_PROCESSED ? _STATUS_WAITING : _STATUS_NONE;
  const etikettType = applicationStatus === APP_BEING_PROCESSED ? ETIKETT_SUCCESS : ETIKETT_WARNING;
  return (
    <EtikettBase type={etikettType} >
      {statusString}
    </EtikettBase>
  );
};

export default Presentational;
