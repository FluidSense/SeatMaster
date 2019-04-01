import moment, { Moment } from 'moment';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { IPostApplicationSeason } from '../../API/interfaces';
import { IStore } from '../../store';
import { timeFormatToBackend } from '../../utils/timeFormatter';
import { fetchSeasonById } from '../ApplicationSeason/actions';
import { IApplicationSeason } from '../ApplicationSeason/reducer';
import DateInputField from '../DateInputField';
import { postNewSeason, putNewSeason, resetSubmit } from './actions';
import './createSeason.css';
import Presentational from './Presentational';
import {
  _ERROR_MESSAGE,
  _ROOM_END,
  _ROOM_END_TOO_EARLY,
  _ROOM_START,
  _SEASON_END,
  _SEASON_END_TOO_EARLY,
  _SEASON_START,
} from './strings';

export interface IState {
  season: IApplicationSeason;
  showAlert: boolean;
  fetched: boolean;
}

interface ILinkProps {
  location: {
    season?: IApplicationSeason;
  };
  match: {
    params: {
      id: string;
    };
  };
}

export interface IStateProps {
  currentSeason?: IApplicationSeason;
  submitted?: boolean;
}

export interface IDispatchProps {
  submitNewSeason: (season: IPostApplicationSeason) =>
    ThunkAction<Promise<void>, {}, {}, AnyAction>;
  fetchSeason: (id: number) => void;
  updateSeason: (body: any, id: number) => void;
  reset: () => void;
}

type Props = IStateProps & IDispatchProps & ILinkProps;

// Need to be in this order to match the proper fields
const inputTextArray = [
  _SEASON_START,
  _SEASON_END,
  _ROOM_START,
  _ROOM_END,
];

export const setTime = (day: Moment) => {
  const newDay = moment(day);
  newDay.set({
    hour: 23,
    minute: 59,
  });
  return newDay;
};

// tslint:disable-next-line:class-name
class _CreateSeason extends Component<Props, IState> {
  constructor(props: Props) {
    super(props);
    const currentTime = setTime(moment());
    const nextMonth = setTime(moment().add(1, 'month'));
    this.state = {
      fetched: false,
      season: {
        applicationPeriodEnd: nextMonth,
        applicationPeriodStart: currentTime,
        end: nextMonth,
        id: 0,
        start: currentTime,
      },
      showAlert: false,
    };
  }

  public componentDidMount = async () => {
    const {
      fetchSeason,
      location,
      match,
    } = this.props;
    const locationSeason = location.season;
    const urlId = match.params.id;
    if (locationSeason) {
      this.setState({ season: locationSeason });
    } else if (urlId) {
      await fetchSeason(Number(urlId));
    }
    this.setState({ fetched: true });
  }

  public componentWillUnmount = () => {
    this.props.reset();
  }

  public componentDidUpdate = (prevProps: Props) => {
    const { showAlert } = this.state;
    const { submitted, currentSeason, reset } = this.props;
    if (currentSeason && prevProps !== this.props) {
      this.setState({ season: currentSeason });
    }
    if (submitted === false && prevProps.submitted === undefined) {
      this.setState({ showAlert: true });
    }
    if (showAlert) {
      setTimeout(() => {
        this.setState({ showAlert: false });
        reset();
      },         5000);
    }
  }

  public render() {
    const { submitted } = this.props;
    if (submitted) return (<Redirect to="/admin/seasons" />);
    const { season, showAlert, fetched } = this.state;

    const submitSeason = season.id ? this.updateApplicationSeason : this.submitApplicationSeason;
    return (
      <Presentational
        createFields={this.createFields}
        submitSeason={submitSeason}
        showAlert={showAlert}
        season={season}
        fetched={fetched}
      />
    );
  }

  private updateApplicationSeason = () => {
    const { season } = this.state;
    const { applicationPeriodEnd, applicationPeriodStart, end, start } = season;
    const body = {
      newPeriodEnd: applicationPeriodEnd.format(timeFormatToBackend),
      newPeriodStart: applicationPeriodStart.format(timeFormatToBackend),
      newRoomEnd: end.format(timeFormatToBackend),
      newRoomStart: start.format(timeFormatToBackend),
    };
    this.props.updateSeason(body, season.id);
  }

  private submitApplicationSeason = () => {
    const { applicationPeriodEnd, applicationPeriodStart, end, start } = this.state.season;
    const body = {
      newPeriodEnd: applicationPeriodEnd.format(timeFormatToBackend),
      newPeriodStart: applicationPeriodStart.format(timeFormatToBackend),
      newRoomEnd: end.format(timeFormatToBackend),
      newRoomStart: start.format(timeFormatToBackend),
    };
    this.props.submitNewSeason(body);
  }

  private createDateInputField = (label: string, key: string, value: Moment) => {
    return (
      <DateInputField
        key={label}
        label={label}
        value={value}
        objectKey={key}
        setDate={this.setDate}
      />
    );
  }

  private setDate = (key: string, time: Moment) => {
    const { season } = this.state;
    const updatedSeason = { ...season, [key]: time };
    this.setState({ season: updatedSeason });
  }

  private createFields = (index: number, indexEnd: number) => {
    const { applicationPeriodEnd, applicationPeriodStart, end, start } = this.state.season;
    const stateEntries = Object.entries({
      applicationPeriodStart,
      // It is needed to have it in this order for the proper error messages
      // tslint:disable-next-line:object-literal-sort-keys
      applicationPeriodEnd,
      start,
      end });
    const fields = [];
    for (let i = index; i < indexEnd; i += 1) {
      fields.push(this.createDateInputField(
        inputTextArray[i],
        stateEntries[i][0],
        stateEntries[i][1],
      ));
    }
    return fields;
  }
}

const mapStateToProps = (state: IStore) => ({
  currentSeason: state.applicationSeason.currentSeason,
  submitted: state.applicationSeason.submitted,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
  fetchSeason: (id: number) => dispatch(fetchSeasonById(id)),
  reset: () => dispatch(resetSubmit()),
  submitNewSeason: (body: any) => dispatch(postNewSeason(body)),
  updateSeason: (body: any, id: number) => dispatch(putNewSeason(body, id)),
});

const CreateSeason = connect(
  mapStateToProps,
  mapDispatchToProps,
)(_CreateSeason);

export default CreateSeason;
