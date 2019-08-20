import React from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { IPostApplicationForm } from '../../API/interfaces';
import { IStore } from '../../store';
import { resetAppStatus } from '../EditApplication/actions';
import { updateSelfApplication } from './actions';
import { fetchAllRooms } from '../ViewRooms/actions';
import { IRoom } from '../ViewRooms';
import { IApplication } from '../Application';
import EditApplication from './Presentational';

interface IDispatchProps {
  resetStatus: () => void;
  updateApplication: (app: IPostApplicationForm) => void;
  getRooms: () => void;
}

interface IStateProps {
  application?: IApplication
  rooms?: IRoom[];
  status: number;
}

interface IOwnState {
  fetchedRooms: boolean;
}

type Props = IDispatchProps & IStateProps;

class _Container extends React.Component<Props, IOwnState>{
  constructor(props: Props){
    super(props);
    const hasRooms = this.props.rooms ? this.props.rooms.length > 0 : false;
    this.state = {
      fetchedRooms: hasRooms,
    }
  }
  public componentDidMount(){
    if (!this.state.fetchedRooms) {
      this.props.getRooms();
    }
  }

  public render(){
    const { rooms, application, status, resetStatus, updateApplication } = this.props;
    if (!rooms || rooms.length == 0) {
      console.error("Could not get rooms");
    }
    if (!application) {
      return "Something went wrong with retrieving your application. Please try again later.";
    }
    return (
      <EditApplication
        resetStatus={resetStatus}
        updateApplication={updateApplication}
        rooms={rooms ? rooms : []}
        application={application}
        status={status}
      />
    );
  }
}

const mapStateToProps = (state: IStore) => ({
  application: state.applications.registeredApplication,
  rooms: state.rooms.rooms,
  status: state.applications.api.status,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
  resetStatus: () => dispatch(resetAppStatus()),
  getRooms: () => dispatch(fetchAllRooms()),
  updateApplication: (application: IPostApplicationForm) => {
    return dispatch(updateSelfApplication(application));
  },
});

const SelfEditApplication = connect(
  mapStateToProps,
  mapDispatchToProps,
)(_Container);

export default SelfEditApplication;
