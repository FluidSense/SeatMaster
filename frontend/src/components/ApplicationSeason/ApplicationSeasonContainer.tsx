import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { fetchApplicationSeasonData } from './ApplicationSeasonActions';
import ApplicationSeasonComponent from './ApplicationSeasonComponent';

// FIXME state should not be any, WIP.
const mapStateToProps = (state: any) => ({
  applicationSeason: state.applicationSeason.applicationSeason,
});

const mapDipsatchToProps = (dispatch: Dispatch) => ({
  fetchSeason: () => dispatch(fetchApplicationSeasonData()),
});

const ApplicationSeasonContainer = connect(
  mapStateToProps,
  mapDipsatchToProps,
)(ApplicationSeasonComponent);

export default ApplicationSeasonContainer;
