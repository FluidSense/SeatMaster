import React from 'react';
import { CallbackComponent, UserState } from 'redux-oidc';
import userManager from '../../utils/userManager';

interface IDispatchProps {
  fetchUserRegistered: (userId: string) => any;
  push: (endpoint: string) => any;
}

type Props = UserState & IDispatchProps;

export const Presentational: React.FunctionComponent<Props> = (props) => {
  const { user } = props;

  const doSuccessCallback = () => {

    console.log(user);

    if (user && !user.expired) {
      console.log("heyo")
      if (!props.fetchUserRegistered(user.id_token)) {
        console.log('registering');
        props.push('/registerUser');
      }
      props.push('/');
    }
    props.push('/loginerror');
  };

  const doErrorCallback = () => {
    props.push('/loginerror');
  };

  return (
    <CallbackComponent
      userManager={userManager}
      successCallback={doSuccessCallback}
      errorCallback={doErrorCallback}
    >
      <div>Redirecting...</div>
    </CallbackComponent>
  );
};
