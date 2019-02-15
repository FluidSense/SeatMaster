import { Hovedknapp } from 'nav-frontend-knapper';
import { SkjemaGruppe } from 'nav-frontend-skjema';
import React from 'react';
import { _CREATE_NEW_SEASON, _NEW_APPLICATION_SEASON } from './strings';

interface IProps {
  alertPeriodEndBeforeStart: any;
  alertApplicationEndBeforeStart: any;
  createFields: (index: number, end: number) => any;
  buttonDisable: boolean;
  postApplicationSeason: () => any;
  alertFail?: JSX.Element;
}

const Presentational: React.FunctionComponent<IProps> = (props) => {
  const {
    alertApplicationEndBeforeStart,
    alertPeriodEndBeforeStart,
    createFields,
    buttonDisable,
    postApplicationSeason,
    alertFail,
  } = props;
  return (
    <>
      <div id="new-application-season">
        <h1>{_NEW_APPLICATION_SEASON}</h1>
        <SkjemaGruppe feil={alertPeriodEndBeforeStart}> {createFields(0, 2)} </SkjemaGruppe>
        <SkjemaGruppe feil={alertApplicationEndBeforeStart}> {createFields(2, 4)} </SkjemaGruppe>
        <Hovedknapp disabled={buttonDisable} onClick={postApplicationSeason}>
          {_CREATE_NEW_SEASON}
        </Hovedknapp>
        {alertFail}
      </div>
    </>
  );
};

export default Presentational;
