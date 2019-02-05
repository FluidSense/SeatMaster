import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { fetchApplicationSeasonData } from './ApplicationSeasonActions';
import ApplicationSeasonComponent from './ApplicationSeasonComponent';

class _ApplicationSeasonContainer extends React.Component<any, any> {
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
