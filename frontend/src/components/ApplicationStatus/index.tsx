import { connect } from 'react-redux';
import { IStore } from '../../store';
import { ETIKETT_SUCCESS, ETIKETT_WARNING } from '../commonConstants';
import { APP_APPROVED, APP_DENIED, APP_NOT_FOUND, APP_SUBMITTED } from '../Login/constants';
import Presentational from './Presentational';
import { _APP_APPROVED, _APP_DENIED, _APP_NOT_FOUND, _APP_SUBMITTED } from './strings';

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
  }
  return etikettText;
};

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
  }
  return etikettType;
};

const mapStateToProps = (state: IStore) => ({
  etikettText: selectEtikettText(state.userInformation.applicationStatus),
  etikettType: selectEtikettType(state.userInformation.applicationStatus),
});

const Container = connect(
  mapStateToProps,
  null,
)(Presentational);

export default Container;
