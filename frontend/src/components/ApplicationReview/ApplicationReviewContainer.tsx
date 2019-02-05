import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { IStore } from '../../store';
import { ILoginState } from '../Login/LoginReducer';
import ApplicationReviewComponent from './ApplicationReviewComponent';

interface IStateProps {
  applicationInfo: ILoginState;
}

type Props = IStateProps;

// tslint:disable-next-line:class-name
class _ApplicationReviewContainer extends React.Component<Props, {}> {
  public render = () => {
    const { applicationInfo } = this.props;
    return (
      <Fragment>
        <h1>Review Application</h1>
        <ApplicationReviewComponent
          applicationInfo={applicationInfo}
        />
      </Fragment>
    );
  }
}

const mapStateToProps = (state: IStore) => ({
  applicationInfo: state.userInformation,
});

const ApplicationReviewContainer = connect(
  mapStateToProps,
  null,
)(_ApplicationReviewContainer);

export default ApplicationReviewContainer;
