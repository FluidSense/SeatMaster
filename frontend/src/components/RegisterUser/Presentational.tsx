import * as React from 'react';

import KnappBase from 'nav-frontend-knapper';
import { UserState } from 'redux-oidc';
import userManager from '../../utils/userManager';

import { _USER_REGISTRATION_TEXT } from './constants';

interface IDispatchProps {
  postCreateUser: (userId: string) => void;
  push: (userId: string) => any;
}

type Props = UserState & IDispatchProps;

export const Presentational: React.FunctionComponent<Props> = (props) => {
  const { postCreateUser, user } = props;
  const createUser = () => {
    if (user && !user.expired) {
      postCreateUser(user.id_token);
    }
    props.push('/');
  };

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
        onClick={userManager.signoutRedirect}
      >
        Log out
      </KnappBase>
    </div>
  );
};

export default Presentational;
