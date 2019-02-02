import { connect } from 'react-redux';
import ApplicationSeasonComponent from './ApplicationSeasonComponent';

const mapStateToProps = (state: any, ownProps: any) => ({
  seasonEnd: ownProps.seasonEnd,
  seasonStart: ownProps.seasonStart,
});

const ApplicationSeasonContainer = connect(
  mapStateToProps,
  null,
)(ApplicationSeasonComponent);

export default ApplicationSeasonContainer;
