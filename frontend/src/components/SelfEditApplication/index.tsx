import React from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { IPostApplicationForm } from '../../API/interfaces';
import { IStore } from '../../store';
import { resetAppStatus } from '../EditApplication/actions';
import { updateSelfApplication } from './actions';
import { fetchAllRooms } from '../ViewRooms/actions';
import { IRoom } from '../ViewRooms';
import EditApplication from './Presentational';

interface IDispatchProps {
  resetStatus: () => void;
  updateApplication: (app: IPostApplicationForm) => void;
  getRooms: () => void;
}

interface IStateProps {
  rooms?: IRoom[];
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
    return (
      <EditApplication
        rooms={this.props.rooms}
        application={this.props.application}
        status={this.props.status}
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
