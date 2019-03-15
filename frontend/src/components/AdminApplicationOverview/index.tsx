import React from 'react';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { IStore } from '../../store';
import { IApplication } from '../Application';
import { fetchAllApplications } from './actions';
import './adminApplicationOverview.css';
import Presentational from './Presentational';

interface IStateProps {
  applications: IApplication[];
}

interface IDispatchProps {
  getAllApplications: () => ThunkAction<void, {}, {}, AnyAction>;
}

type Props = IStateProps & IDispatchProps;

// tslint:disable-next-line:class-name
class _Container extends React.Component<Props> {
  public componentDidMount() {
    this.props.getAllApplications();
  }

  public render() {
    return (
      <Presentational
        applications={this.props.applications}
      />);
  }
}

const mapStateToProps = (state: IStore) => ({
  applications: state.applications.applications,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
  getAllApplications: () => dispatch(fetchAllApplications()),
});

const Container = connect(
  mapStateToProps,
  mapDispatchToProps,
)(_Container);

export default Container;
