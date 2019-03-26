import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { IStore } from '../../store';
import { fetchSingleRoom } from '../ApplicationAccepted/actions';
import { fetchApplicationInformation } from './actions';
import { Presentational } from './Presentational';

const mapStateToProps = (state: IStore) => ({
  application: state.applications.registeredApplication,
  oidc: state.oidc,
  rooms: state.rooms.rooms,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
  fetchApplicationInformation: () => dispatch(fetchApplicationInformation()),
  fetchRoomInfo: (id: number) => dispatch(fetchSingleRoom(id)),
});

const Home = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Presentational);

export default Home;
