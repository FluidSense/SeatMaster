import React from 'react';

import { UserState } from 'redux-oidc';
import { IRegisteredUserState } from '../RegisterUser/reducer';
import { RoutesAdmin } from '../RoutesAdmin';
import { RoutesLogin } from '../RoutesLogin';
import { RoutesRegister } from '../RoutesRegister';
import { RoutesUser } from '../RoutesUser';

interface IDispatchProps {
  fetchUserData: () => void;
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
    if (!oidc.user || oidc.user.expired) return <RoutesLogin />;
    if (!userInformation.registered) return <RoutesRegister />;
    return userInformation.admin ? <RoutesAdmin /> : <RoutesUser />;
  }

  public componentDidMount() {
    this.checkuserRegistration();
  }

  public componentDidUpdate(prevProps: Props) {
    const { oidc } = this.props;

    if (oidc.user && !oidc.user.expired && prevProps.oidc.isLoadingUser && !oidc.isLoadingUser) {
      this.checkuserRegistration();
    }
  }

  private async checkuserRegistration() {
    const { fetchUserData, oidc } = this.props;

    if (oidc.user && !oidc.user.expired) {
      await fetchUserData();
    }
  }
}
