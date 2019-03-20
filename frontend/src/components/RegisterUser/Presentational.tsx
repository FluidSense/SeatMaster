import KnappBase from 'nav-frontend-knapper';
import * as React from 'react';
import { UserState } from 'redux-oidc';
import userManager from '../../utils/userManager';
import { _USER_CONFIRMATION_TEXT, _USER_REGISTRATION_TEXT } from './constants';

interface IDispatchProps {
  postCreateUser: () => void;
  push: (userId: string) => void;
}

interface IStateProps {
  loadingUserInformation: boolean;
}

type Props = UserState & IDispatchProps & IStateProps;

export const Presentational: React.FunctionComponent<Props> = (props) => {
  const { postCreateUser, user, loadingUserInformation } = props;

  const createUser = async (event: React.MouseEvent) => {
    event.preventDefault();

    if (user && !user.expired) {
      await postCreateUser();
    }
    props.push('/');
  };

  const doLogout = (event: React.MouseEvent) => {
    event.preventDefault();
    userManager.signoutRedirect();
  };
  const onClickAction = (event: React.MouseEvent) => doLogout(event);

  if (loadingUserInformation) {
    return <></>;
  }

  return (
    <div style={{ padding: '2rem 2.5rem' }}>
      {_USER_REGISTRATION_TEXT}
      <br />
      {_USER_CONFIRMATION_TEXT}
      <br />
      <KnappBase
        type="hoved"
        htmlType="submit"
        autoDisableVedSpinner={true}
        onClick={createUser}
      >
        Register
      </KnappBase>
      <KnappBase
        type="hoved"
        htmlType="submit"
        autoDisableVedSpinner={true}
        onClick={onClickAction}
      >
        Log out
      </KnappBase>
    </div>
  );
};

export default Presentational;
