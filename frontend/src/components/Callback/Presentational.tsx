import React from 'react';
import { CallbackComponent } from 'redux-oidc';
import userManager from '../../utils/userManager';

interface IProps {
  push: (userId: string) => any;
}

export const Presentational: React.FunctionComponent<IProps> = (props) =>{
  const doSuccessCallback = () => {
    props.push('/');
  };

  const doErrorCallback = () => {
    props.push('/');
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
