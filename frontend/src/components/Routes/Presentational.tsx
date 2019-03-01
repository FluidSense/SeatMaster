import React from 'react';

import { UserState } from 'redux-oidc';
import { IRegisteredUserState } from '../RegisterUser/reducer';
import { RoutesLogin } from '../RoutesLogin';
import { RoutesRegister } from '../RoutesRegister';
import { RoutesUser } from '../RoutesUser';

interface IDispatchProps {
  fetchUserData: (idToken: string) => void;
}

interface IUserStates {
  userInformation: IRegisteredUserState;
  oidc: UserState;
}

type Props = IUserStates & IDispatchProps;

export class Presentational extends React.Component<Props, {}> {

  constructor(props: Props) {
    super(props);
  }

  public render() {
    const { oidc, userInformation } = this.props;
    if (!oidc.user || oidc.user.expired) {
      return <RoutesLogin />;
    }
    if (!userInformation.registered) { // Check user reg
      return <RoutesRegister />;
    }

    // TODO: Add a check for admin privileges and add adminroutes
    return <RoutesUser />;
  }

  public componentDidUpdate() {
    const { fetchUserData, oidc } = this.props;
    if (oidc.user && !oidc.user.expired) {
      fetchUserData(oidc.user.id_token);
    }
  }
}
