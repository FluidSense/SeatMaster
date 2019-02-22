import React from 'react';
import { connect } from 'react-redux';
import { IStore } from '../../store';
import Presentational from './Presentational';

interface IStateProps {
  applicationInfo: IApplicationInfoObject;
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
}

// tslint:disable-next-line:class-name
class _Container extends React.Component<IStateProps> {
  public render = () => {
    const { applicationInfo } = this.props;
    return (
      <Presentational applicationInfo={applicationInfo} />
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
