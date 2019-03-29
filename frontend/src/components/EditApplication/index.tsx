import React from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { IPostAdminApplicationForm } from '../../API/interfaces';
import { IStore } from '../../store';
import { fetchAllApplications } from '../AdminApplicationOverview/actions';
import { IApplication } from '../Application';
import { resetAppStatus, updateSingleApplication } from './actions';
import Presentational from './Presentational';

interface IDispatchProps {
  resetStatus: () => void;
  updateApplication: (id: number, app: IPostAdminApplicationForm) => void;
  getApplications: () => void;
}

interface IStateProps {
  applications: IApplication[];
  status: number;
  match: {
    params: {
      id: string;
    },
  };
}

interface IOwnState {
  fetchedApplications: boolean;
}

type Props = IDispatchProps & IStateProps;

// tslint:disable-next-line:class-name
class _Container extends React.Component<Props, IOwnState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      fetchedApplications: false,
    };
  }

  public componentDidMount() {
    if (!this.props.applications.length && !this.state.fetchedApplications) {
      this.setState({ fetchedApplications: true });
      this.props.getApplications();
    }
  }

  public render() {
    return (
      <Presentational
        applications={this.props.applications}
        matchId={this.props.match.params.id}
        status={this.props.status}
        updateApplication={this.props.updateApplication}
        resetStatus={this.props.resetStatus}
      />
    );
  }
}

const mapStateToProps = (state: IStore) => ({
  applications: state.applications.applications,
  status: state.applications.api.status,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
  getApplications: () => dispatch(fetchAllApplications()),
  resetStatus: () => dispatch(resetAppStatus()),
  updateApplication: (id: number, application: IPostAdminApplicationForm) => {
    return dispatch(updateSingleApplication(id, application));
  },
});

const EditApplication = connect(
  mapStateToProps,
  mapDispatchToProps,
)(_Container);

export default EditApplication;
