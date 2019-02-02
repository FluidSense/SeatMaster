import { connect } from 'react-redux';
import ApplicationSeasonComponent from './ApplicationSeasonComponent';

// FIXME state should not be any, WIP.
const mapStateToProps = (state: any) => ({
  applicationSeason: state.home.applicationSeason,
});

const ApplicationSeasonContainer = connect(
  mapStateToProps,
  null,
)(ApplicationSeasonComponent);

export default ApplicationSeasonContainer;
