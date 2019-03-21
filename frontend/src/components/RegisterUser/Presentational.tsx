import KnappBase from 'nav-frontend-knapper';
import Veilederpanel from 'nav-frontend-veilederpanel';
import * as React from 'react';
import { UserState } from 'redux-oidc';
import userManager from '../../utils/userManager';
import { _USER_CONFIRMATION_TEXT, _USER_REGISTRATION_TEXT } from './constants';
import './registeruser.css';
import veileder from './veileder';

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
    <>
      <div className="student-header" style={{ height: '2rem' }}/>
      <div style={{ padding: '2rem 2.5rem' }}>
        <Veilederpanel type={'plakat'} kompakt={true} svg={veileder}>
          {_USER_REGISTRATION_TEXT}
          <br />
          {_USER_CONFIRMATION_TEXT}
          <br />
          <div id={'register-buttons'}>
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
        </Veilederpanel>
      </div>
    </>
  );
};

export default Presentational;
