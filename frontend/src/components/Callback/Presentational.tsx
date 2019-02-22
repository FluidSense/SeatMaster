import React from 'react';
import { CallbackComponent } from 'redux-oidc';
import userManager from '../../utils/userManager';

interface IProps {
  push: (userId: string) => any;
}

export const Presentational: React.FunctionComponent<IProps> = (props) => {
  const doSuccessCallback = () => {
    console.log("Actual success");
    props.push('/');
  };

  const doErrorCallback = () => {
    // TODO: Create login failure page
    console.log("failure");
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
