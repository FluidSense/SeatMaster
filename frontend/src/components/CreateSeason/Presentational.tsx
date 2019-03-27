import EtikettBase from 'nav-frontend-etiketter';
import KnappBase, { Hovedknapp } from 'nav-frontend-knapper';
import { SkjemaGruppe } from 'nav-frontend-skjema';
import { SkjemaelementFeil } from 'nav-frontend-skjema/lib/skjemaelement-feilmelding';
import { Sidetittel } from 'nav-frontend-typografi';
import React from 'react';
import { IApplicationSeason } from '../ApplicationSeason/reducer';
import { _CREATE_NEW_SEASON, _NEW_APPLICATION_SEASON } from './strings';

interface IProps {
  alertPeriodEndBeforeStart?: SkjemaelementFeil;
  alertApplicationEndBeforeStart?: SkjemaelementFeil;
  createFields: (index: number, end: number) => JSX.Element[];
  buttonDisable: boolean;
  postApplicationSeason: () => void;
  alert?: JSX.Element;
  season?: IApplicationSeason;
  id: number;
  updateApplicationSeason: () => void;
}

const Presentational: React.FunctionComponent<IProps> = (props) => {
  const {
    alertApplicationEndBeforeStart,
    alertPeriodEndBeforeStart,
    createFields,
    buttonDisable,
    postApplicationSeason,
    alert,
    season,
    id,
    updateApplicationSeason,
  } = props;
  const updateSeasonButton = id > 0 ? <KnappBase onClick={updateApplicationSeason} type="hoved" id="update-season-btn">Update current season</KnappBase> : null;
  const seasonEtikett = season ? <EtikettBase className="season-etikett" type="fokus">There already exists a season</EtikettBase> : null;
  return (
    <div id="new-application-season" className="main-content">
      <Sidetittel>{_NEW_APPLICATION_SEASON}</Sidetittel>
      {seasonEtikett}
      {alert}
      <div id="appSeason">
        <SkjemaGruppe className="app-class" feil={alertPeriodEndBeforeStart}>
          {createFields(0, 2)}
        </SkjemaGruppe>
      </div>
      <div id="roomSeason">
        <SkjemaGruppe className="room-class" feil={alertApplicationEndBeforeStart}>
          {createFields(2, 4)}
        </SkjemaGruppe>
      </div>
      <KnappBase
        type="hoved"
        disabled={buttonDisable}
        onClick={postApplicationSeason}
        id={'new-season-btn'}
      >
        {_CREATE_NEW_SEASON}
      </KnappBase>
      {updateSeasonButton}
    </div>
  );
};

export default Presentational;
