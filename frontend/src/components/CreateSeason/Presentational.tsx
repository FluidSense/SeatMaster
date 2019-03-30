import AlertStripe from 'nav-frontend-alertstriper';
import KnappBase from 'nav-frontend-knapper';
import { SkjemaGruppe } from 'nav-frontend-skjema';
import { Sidetittel } from 'nav-frontend-typografi';
import React from 'react';
import { IApplicationSeason } from '../ApplicationSeason/reducer';
import { TitleAndSpinner } from '../LoadingPageSpinner/TitleAndSpinner';
import {
  _CREATE_NEW_SEASON,
  _ERROR_MESSAGE,
  _EXISTING_CURRENT_SEASON,
  _NEW_APPLICATION_SEASON,
  _ROOM_END_TOO_EARLY,
  _SEASON_END_TOO_EARLY,
  _UPDATE_APPLICATION_SEASON,
  _UPDATE_CURRENT_SEASON,
} from './strings';

interface IProps {
  createFields: (index: number, end: number) => JSX.Element[];
  showAlert: boolean;
  season: IApplicationSeason;
  submitSeason: () => void;
  fetched: boolean;
}

const errorObjectSeasonEndTooEarly = { feilmelding: _SEASON_END_TOO_EARLY };
const errorObjectRoomEndTooEarly = { feilmelding: _ROOM_END_TOO_EARLY };

const Presentational: React.FunctionComponent<IProps> = (props) => {
  const {
    createFields,
    submitSeason,
    showAlert,
    season,
    fetched,
  } = props;
  const title = fetched && season.id ? _UPDATE_APPLICATION_SEASON : _NEW_APPLICATION_SEASON;
  const { applicationPeriodEnd, applicationPeriodStart, end, start } = season;
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
  const errorPeriodEndBeforeStart =
    applicationPeriodEnd <= applicationPeriodStart
      ? errorObjectSeasonEndTooEarly
      : undefined;

  const errorApplicationEndBeforeStart =
    end <= start
      ? errorObjectRoomEndTooEarly
      : undefined;

  const buttonDisable =
    errorPeriodEndBeforeStart !== undefined
    || errorApplicationEndBeforeStart !== undefined;

  const alertFail = showAlert
    ? <AlertStripe type={'advarsel'} solid={true}> {_ERROR_MESSAGE} </AlertStripe>
    : undefined;

  const button = season.id > 0
    ? createButton(_UPDATE_CURRENT_SEASON)
    : createButton(_CREATE_NEW_SEASON);

  return (
    <div id="new-application-season" className="main-content">
      <Sidetittel>{title}</Sidetittel>
      <div id="admin-season-alert">{alertFail}</div>
      <div id="appSeason">
        <SkjemaGruppe className="app-class" feil={errorPeriodEndBeforeStart}>
          {createFields(0, 2)}
        </SkjemaGruppe>
      </div>
      <div id="roomSeason">
        <SkjemaGruppe className="room-class" feil={errorApplicationEndBeforeStart}>
          {createFields(2, 4)}
        </SkjemaGruppe>
      </div>
      {button}
    </div>
  );
};

export default Presentational;
