import EtikettBase from 'nav-frontend-etiketter';
import React from 'react';
import {
  APP_APPROVED,
  APP_DENIED,
  APP_NOT_FOUND,
  APP_SUBMITTED,
  APP_WAITING,
  ETIKETT_SUCCESS,
  ETIKETT_WARNING,
} from '../commonConstants';
import {
  _APP_APPROVED,
  _APP_DENIED,
  _APP_NOT_FOUND,
  _APP_SUBMITTED,
  _APP_WAITING,
} from './strings';

interface IApplicationStatusProps {
  applicationStatus: string;
}

const selectEtikettText = (applicationStatus: string) => {
  let etikettText: string = _APP_NOT_FOUND;

  switch (applicationStatus) {
    case APP_SUBMITTED:
      etikettText = _APP_SUBMITTED;
      break;
    case APP_NOT_FOUND:
      etikettText = _APP_NOT_FOUND;
      break;
    case APP_APPROVED:
      etikettText = _APP_APPROVED;
      break;
    case APP_DENIED:
      etikettText = _APP_DENIED;
      break;
    case APP_WAITING:
      etikettText = _APP_WAITING;
      break;
  }
  return etikettText;
};

export type EtikettTypes = 'suksess' | 'info' | 'advarsel' | 'fokus';

const selectEtikettType = (applicationStatus: string) => {
  let etikettType: 'suksess' | 'info' | 'advarsel' | 'fokus' = ETIKETT_WARNING;

  switch (applicationStatus) {
    case APP_SUBMITTED:
      etikettType = ETIKETT_SUCCESS;
      break;
    case APP_NOT_FOUND:
      etikettType = ETIKETT_WARNING;
      break;
    case APP_APPROVED:
      etikettType = ETIKETT_SUCCESS;
      break;
    case APP_DENIED:
      etikettType = ETIKETT_WARNING;
      break;
    case APP_WAITING:
      etikettType = ETIKETT_WARNING;
      break;
  }
  return etikettType;
};

const Presentational: React.FunctionComponent<IApplicationStatusProps> = (props) => {
  const { applicationStatus } = props;
  const etikettType = selectEtikettType(applicationStatus);
  const etikettText = selectEtikettText(applicationStatus);
  // Added div because it is inline display and won't work well with flexbox
  return (
    <div>
      <EtikettBase type={etikettType}>{etikettText}</EtikettBase>
    </div>
  );
};

export default Presentational;
