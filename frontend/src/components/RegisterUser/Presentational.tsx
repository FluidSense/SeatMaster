import * as React from 'react';

import KnappBase from 'nav-frontend-knapper';
import { UserState } from 'redux-oidc';
import userManager from '../../utils/userManager';

import { _USER_REGISTRATION_TEXT } from './constants';

interface IDispatchProps {
  postCreateUser: (accessToken: string) => void;
  push: (userId: string) => any;
}

type Props = UserState & IDispatchProps;

export const Presentational: React.FunctionComponent<Props> = (props) => {
  const { postCreateUser, user } = props;

  const createUser = async (event: React.MouseEvent) => {
    event.preventDefault();

    if (user && !user.expired) {
      await postCreateUser(user.access_token);
    }
    props.push('/');
  };

  const doLogout = (event: React.MouseEvent) => {
    event.preventDefault();
    userManager.signoutRedirect();
  };
  const onClickAction = (event: React.MouseEvent) => doLogout(event);

  return (
    <div style={{ padding: '2rem 2.5rem' }}>
      {_USER_REGISTRATION_TEXT}
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
