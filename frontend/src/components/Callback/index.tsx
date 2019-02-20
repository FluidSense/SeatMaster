import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { CallbackComponent } from 'redux-oidc';
import userManager from './../../utils/userManager';

class CallbackPage extends React.Component {
  public render() {
    return (
      <CallbackComponent
        userManager={userManager}
        successCallback={this.doSuccessCallback}
        errorCallback={this.doErrorCallback}
      >
        <div>Redirecting...</div>
      </CallbackComponent>
    );
  }

  private doSuccessCallback = () => {
    this.props.dispatch(push('/'));
  }

  private doErrorCallback = () => {
    this.props.dispatch(push('/'));
    console.error(error);
  }
}

export default connect()(CallbackPage);
