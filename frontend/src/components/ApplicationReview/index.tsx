import React from 'react';
import { connect } from 'react-redux';
import { IStore } from '../../store';
import { IRegisteredApplicationState } from './../Home/reducer';
import { IRegisteredUserState } from './../RegisterUser/reducer';
import './applicationReview.css';
import Presentational from './Presentational';

interface IStateProps {
  applicationInfo: IRegisteredApplicationState;
  userInfo: IRegisteredUserState;
}

// tslint:disable-next-line:class-name
class _Container extends React.Component<IStateProps> {
  public render = () => {
    const { applicationInfo, userInfo } = this.props;
    return (
      <Presentational applicationInfo={applicationInfo} userInfo={userInfo} />
    );
  }
}

const mapStateToProps = (state: IStore) => ({
  applicationInfo: state.applicationInformation,
  userInfo: state.userInformation,
});

const ApplicationReview = connect(
  mapStateToProps,
  null,
)(_Container);

export default ApplicationReview;
