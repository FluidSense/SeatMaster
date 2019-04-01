import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { IStore } from '../../store';
import { IApplicationSeason } from '../ApplicationSeason/reducer';
import { IRouterProps } from '../ViewRooms';
import { fetchAllSeasons } from './actions';
import Presentational from './Presentational';
import './viewApplicationSeason.css';

interface IStateProps {
  fetching: string;
  seasons: IApplicationSeason[];
}

interface IDispatchProps {
  fetchSeasons: () => void;
}

interface IState {
  seasons: IApplicationSeason[];
}

type Props = IRouterProps & IStateProps & IDispatchProps;

// tslint:disable-next-line:class-name
class _Container extends Component<Props, IState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      seasons: props.seasons,
    };
  }

  public componentDidMount = () => this.props.fetchSeasons();

  public componentDidUpdate = (prevProps: Props) => {
    const { seasons } = this.props;
    if (prevProps.seasons !== seasons) this.setState({ seasons });
  }

  public render() {
    const { history, fetching } = this.props;
    const { seasons } = this.state;
    const onClick = () => history.push('/admin/seasons/create-season');
    return (
      <Presentational
        onClick={onClick}
        fetching={fetching}
        seasons={seasons}
      />);
  }
}

const mapStateToProps = (state: IStore) => ({
  fetching: state.seasons.fetching,
  seasons: state.seasons.seasons,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
  fetchSeasons: () => dispatch(fetchAllSeasons()),
});

const ViewApplicationSeasons = connect(
  mapStateToProps,
  mapDispatchToProps,
)(_Container);

export default ViewApplicationSeasons;
