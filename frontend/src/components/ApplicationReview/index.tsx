import KnappBase from 'nav-frontend-knapper';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { IStore } from '../../store';
import { EDIT } from './Strings';

interface IStateProps {
  applicationInfo: any;
}

type Props = IStateProps;

// tslint:disable-next-line:class-name
class _Container extends React.Component<Props, {}> {
  public render = () => {
    const { applicationInfo } = this.props;
    return (
      <Fragment>
        <h1>Review Application</h1>
      </Fragment>
    );
  }
}

const mapStateToProps = (state: IStore) => ({
  applicationInfo: state.userInformation,
});

const ApplicationReview = connect(
  mapStateToProps,
  null,
)(_Container);

export default ApplicationReview;
