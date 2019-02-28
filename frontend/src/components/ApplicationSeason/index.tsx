import moment from 'moment';
import React from 'react';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { fetchApplicationSeasonData } from './actions';
import './applicationSeason.css';
import Presentational from './Presentational';
import { IApplicationSeason } from './reducer';

interface IStateProps {
  applicationSeason: IApplicationSeason;
}

interface IDispatchProps {
  fetchSeason: () => ThunkAction<Promise<AnyAction>, {}, {}, AnyAction>;
}

type Props = IStateProps & IDispatchProps;

// tslint:disable-next-line:class-name
class _Container extends React.Component<Props, {}> {
  public componentDidMount = () => {
    const { fetchSeason } = this.props;
    fetchSeason();
  }

  public render = () => {
    const { applicationSeason } = this.props;
    return (
      <Presentational applicationSeason={applicationSeason} currentDate={moment()} />
    );
  }
}

const mapStateToProps = (state: IStateProps) => ({
  applicationSeason: state.applicationSeason,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
  fetchSeason: () => dispatch(fetchApplicationSeasonData()),
});

const ApplicationSeason = connect(
  mapStateToProps,
  mapDispatchToProps,
)(_Container);

export default ApplicationSeason;
