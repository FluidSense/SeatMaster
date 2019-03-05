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

export interface IApplicationInfoObject {
  fullname?: string;
  email?: string;
  phone?: string;
  status?: string;
  partner?: string;
  room?: string;
  seatRollover?: string;
  needs?: string;
  applicationStatus?: string;
  user?: {
    id: number,
    username: string,
  };
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
});

const ApplicationReview = connect(
  mapStateToProps,
  null,
)(_Container);

export default ApplicationReview;
