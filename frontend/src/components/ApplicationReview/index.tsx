import React from 'react';
import { connect } from 'react-redux';
import { IStore } from '../../store';
import { IApplication } from '../Application';
import { IRegisteredUserState } from './../RegisterUser/reducer';
import './applicationReview.css';
import Presentational from './Presentational';

interface IStateProps {
  application?: IApplication;
  userInfo: IRegisteredUserState;
}

// tslint:disable-next-line:class-name
class _Container extends React.Component<IStateProps> {
  public render = () => {
    const { application, userInfo } = this.props;
    return (
      <Presentational application={application} userInfo={userInfo} />
    );
  }
}

const mapStateToProps = (state: IStore) => ({
  applicationInfo: state.applications.registeredApplication,
  userInfo: state.userInformation,
});

const ApplicationReview = connect(
  mapStateToProps,
  null,
)(_Container);

export default ApplicationReview;
