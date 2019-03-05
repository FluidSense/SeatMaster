import * as React from 'react';
import { UserState } from 'redux-oidc';
import ApplicationReview from '../ApplicationReview';
import _Container from '../ApplicationSeason/index';
import Container from '../ApplicationStatus/index';

interface IDispatchProps {
  fetchApplicationInformation: (username: string) => any;
}

interface IUserStates {
  oidc: UserState;
}

type Props = IUserStates & IDispatchProps;

export class Presentational extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
  }

  public render() {
    return (
      <div>
        <h1>My status</h1>
        <_Container />
        <Container />
        <ApplicationReview />
      </div>
    );
  }

  public componentDidUpdate() {
    const { fetchApplicationInformation, oidc } = this.props;
    if (oidc.user && !oidc.user.expired) {
      fetchApplicationInformation('1');
    }
  }
}

export default Presentational;
