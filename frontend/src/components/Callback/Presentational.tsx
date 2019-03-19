import React from 'react';
import { CallbackComponent } from 'redux-oidc';
import userManager from '../../utils/userManager';

interface IDispatchProps {
  push: (endpoint: string) => any;
}

type Props = IDispatchProps;

export const Presentational: React.FunctionComponent<Props> = (props) => {

  const doSuccessCallback = () => {
    props.push('/');
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
