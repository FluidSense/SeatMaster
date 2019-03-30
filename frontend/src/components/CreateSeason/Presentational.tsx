import KnappBase from 'nav-frontend-knapper';
import { SkjemaGruppe } from 'nav-frontend-skjema';
import { SkjemaelementFeil } from 'nav-frontend-skjema/lib/skjemaelement-feilmelding';
import { Sidetittel } from 'nav-frontend-typografi';
import React from 'react';
import { IApplicationSeason } from '../ApplicationSeason/reducer';
import { TitleAndSpinner } from '../LoadingPageSpinner/TitleAndSpinner';
import {
  _CREATE_NEW_SEASON,
  _EXISTING_CURRENT_SEASON,
  _NEW_APPLICATION_SEASON,
  _UPDATE_APPLICATION_SEASON,
  _UPDATE_CURRENT_SEASON,
} from './strings';

interface IProps {
  alertPeriodEndBeforeStart?: SkjemaelementFeil;
  alertApplicationEndBeforeStart?: SkjemaelementFeil;
  createFields: (index: number, end: number) => JSX.Element[];
  buttonDisable: boolean;
  alert?: JSX.Element;
  season: IApplicationSeason;
  submitSeason: () => void;
  fetched: boolean;
}

const Presentational: React.FunctionComponent<IProps> = (props) => {
  const {
    alertApplicationEndBeforeStart,
    alertPeriodEndBeforeStart,
    createFields,
    buttonDisable,
    submitSeason,
    alert,
    season,
    fetched,
  } = props;
  const title = fetched ? _UPDATE_APPLICATION_SEASON : _NEW_APPLICATION_SEASON;
  if (!fetched) return <TitleAndSpinner title={title} />;

  const createButton = (text: string) => (
    <KnappBase
      onClick={submitSeason}
      disabled={buttonDisable}
      type="hoved"
      id="new-season-btn"
    >
      {text}
    </KnappBase>
  );

  const button = season.id > 0
    ? createButton(_UPDATE_CURRENT_SEASON)
    : createButton(_CREATE_NEW_SEASON);

  return (
    <div id="new-application-season" className="main-content">
      <Sidetittel>{title}</Sidetittel>
      <div id="admin-season-alert">{alert}</div>
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
      {button}
    </div>
  );
};

export default Presentational;
