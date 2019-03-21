import KnappBase from 'nav-frontend-knapper';
import { User } from 'oidc-client';
import * as React from 'react';
import { Sidetittel, Normaltekst, Undertekst, UndertekstBold, Innholdstittel, Systemtittel } from 'nav-frontend-typografi';
import { _PROFILE_INFORMATION_TEXT, _PROFILE_DELETE_WARNING } from './constants';

interface IDispatchProps {
  deleteAndRemoveUser: () => void;
}

interface IStateProps {
  isLoadingUser: boolean;
  user?: User;
}

type Props = IDispatchProps & IStateProps;

export const Presentational: React.FunctionComponent<Props> = (props) => {
  const { deleteAndRemoveUser, isLoadingUser, user } = props;

  const deleteUser = async (event: React.MouseEvent) => {
    event.preventDefault();

    if (user && !user.expired) {
      await deleteAndRemoveUser();
    }
  };

  return (
    <div className="main-content">
      <Sidetittel tag="h1">
        Your profile information
      </Sidetittel>
      <Normaltekst>
        {_PROFILE_INFORMATION_TEXT}
      </Normaltekst>
      <br />
      <Systemtittel tag="h3">Information stored about you</Systemtittel>
      <Normaltekst tag="ul">
        <Normaltekst tag="li">
          Feide identity
        </Normaltekst>
        <Normaltekst tag="li">
          Full name
        </Normaltekst>
        <Normaltekst tag="li">
          Email
        </Normaltekst>
        <Normaltekst tag="li">
          Completed subjects and master status
        </Normaltekst>
        <Normaltekst tag="li">
          All your application preferences
        </Normaltekst>
      </Normaltekst>
      <br />
      <Normaltekst>
        {_PROFILE_DELETE_WARNING}
      </Normaltekst>
      <br />

      <KnappBase
        type="fare"
        htmlType="submit"
        autoDisableVedSpinner={isLoadingUser}
        onClick={deleteUser}
      >
        Delete
      </KnappBase>
    </div>
  );
};

export default Presentational;
