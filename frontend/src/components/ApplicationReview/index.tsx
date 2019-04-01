import React from 'react';
import { connect } from 'react-redux';
import { IStore } from '../../store';
import { IApplication } from '../Application';
import './applicationReview.css';
import Presentational from './Presentational';

interface IStateProps {
  application?: IApplication;
}

// tslint:disable-next-line:class-name
class _Container extends React.Component<IStateProps> {
  public render = () => {
    const { application } = this.props;
    return (
      <Presentational application={application} />
    );
  }
}

const mapStateToProps = (state: IStore) => ({
  applicationInfo: state.applications.registeredApplication,
});

const ApplicationReview = connect(
  mapStateToProps,
  null,
)(_Container);

export default ApplicationReview;
