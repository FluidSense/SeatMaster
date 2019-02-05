import React from 'react';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { fetchApplicationSeasonData } from './ApplicationSeasonActions';
import ApplicationSeasonComponent from './ApplicationSeasonComponent';
import { IApplicationSeason } from './ApplicationSeasonReducer';

interface IState {
  fetchSeason: () => ThunkAction<Promise<void>, {}, {}, AnyAction>;
  applicationSeason: IApplicationSeason;
}

// tslint:disable-next-line:class-name
class _ApplicationSeasonContainer extends React.Component<IState, {}> {
  public componentDidMount = () => {
    const { fetchSeason } = this.props;
    fetchSeason();
  }

  public render = () => {
    const { applicationSeason } = this.props;
    return (
    <ApplicationSeasonComponent
      applicationSeason={applicationSeason}
    />
    );
  }
}

// FIXME state should not be any, WIP.
const mapStateToProps = (state: any) => ({
  applicationSeason: state.applicationSeason,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any >) => ({
  fetchSeason: () => dispatch(fetchApplicationSeasonData()),
});

const ApplicationSeasonContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(_ApplicationSeasonContainer);

export default ApplicationSeasonContainer;
