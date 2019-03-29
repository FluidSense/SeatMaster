import moment, { Moment } from 'moment';
import AlertStripe from 'nav-frontend-alertstriper';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { IPostApplicationSeason } from '../../API/interfaces';
import { IStore } from '../../store';
import { fetchApplicationSeasonData } from '../ApplicationSeason/actions';
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
}

interface ILocationProps {
  location: {
    season?: IApplicationSeason;
  };
}

export interface IStateProps {
  currentSeason?: IApplicationSeason;
  submitted?: boolean;
}

export interface IDispatchProps {
  submitNewSeason: (season: IPostApplicationSeason) =>
    ThunkAction<Promise<void>, {}, {}, AnyAction>;
  fetchSeason: () => void;
  updateSeason: (body: any, id: number) => void;
  reset: () => void;
}

type AlertStripeTypes = 'advarsel' | 'suksess' | 'info' | 'nav-ansatt' | 'stopp';
type Props = IStateProps & IDispatchProps & ILocationProps;

// Need to be in this order to match the proper fields
const inputTextArray = [
  _SEASON_START,
  _SEASON_END,
  _ROOM_START,
  _ROOM_END,
];

const errorObjectSeasonEndTooEarly = { feilmelding: _SEASON_END_TOO_EARLY };
const errorObjectRoomEndTooEarly = { feilmelding: _ROOM_END_TOO_EARLY };

export const setTime = (day: Moment) => {
  const newDay = moment(day);
  newDay.set({
    hour: 23,
    minute: 59,
  });
  return newDay;
};

// Format to match backend model
export const format = 'YYYY-MM-DD HH:mm:ss.SSS';

// tslint:disable-next-line:class-name
class _CreateSeason extends Component<Props, IState> {
  constructor(props: Props) {
    super(props);
    const currentTime = setTime(moment());
    const nextMonth = setTime(moment().add(1, 'month'));
    this.state = {
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
    // this.props.fetchSeason();
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
    if (submitted) return (<Redirect to="/admin/applications" />);
    const { season, showAlert } = this.state;
    const { applicationPeriodEnd, applicationPeriodStart, end, start } = season;
    const errorPeriodEndBeforeStart =
      applicationPeriodEnd <= applicationPeriodStart
        ? errorObjectSeasonEndTooEarly
        : undefined;

    const errorApplicationEndBeforeStart =
      end <= start
        ? errorObjectRoomEndTooEarly
        : undefined;

    const buttonDisable =
      errorPeriodEndBeforeStart !== undefined
      || errorApplicationEndBeforeStart !== undefined;

    const alertFail = showAlert
      ? this.createAlert(_ERROR_MESSAGE, 'advarsel')
      : undefined;

    const submitSeason = season.id ? this.updateApplicationSeason : this.submitApplicationSeason;
    return (
      <Presentational
        buttonDisable={buttonDisable}
        alertApplicationEndBeforeStart={errorApplicationEndBeforeStart}
        alertPeriodEndBeforeStart={errorPeriodEndBeforeStart}
        createFields={this.createFields}
        submitSeason={submitSeason}
        alert={alertFail}
        season={season}
      />
    );
  }

  private updateApplicationSeason = () => {
    const { season } = this.state;
    const { applicationPeriodEnd, applicationPeriodStart, end, start } = season;
    const body = {
      newPeriodEnd: applicationPeriodEnd.format(format),
      newPeriodStart: applicationPeriodStart.format(format),
      newRoomEnd: end.format(format),
      newRoomStart: start.format(format),
    };
    this.props.updateSeason(body, season.id);
  }

  private submitApplicationSeason = () => {
    const { applicationPeriodEnd, applicationPeriodStart, end, start } = this.state.season;
    const body = {
      newPeriodEnd: applicationPeriodEnd.format(format),
      newPeriodStart: applicationPeriodStart.format(format),
      newRoomEnd: end.format(format),
      newRoomStart: start.format(format),
    };
    this.props.submitNewSeason(body);
  }

  private createDateInputField = (label: string, key: string, value: Moment) => {
    const doNothing = () => null;
    return (
      <DateInputField
        key={label}
        label={label}
        value={value}
        objectKey={key}
        setDate={doNothing}
      />
    );
  }

  private createAlert = (text: string, type: AlertStripeTypes) =>
    <AlertStripe type={type} solid={true}> {text} </AlertStripe>

  private createFields = (index: number, indexEnd: number) => {
    const { applicationPeriodEnd, applicationPeriodStart, end, start } = this.state.season;
    const stateEntries = Object.entries({
      applicationPeriodEnd,
      applicationPeriodStart,
      end,
      start });
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
  fetchSeason: () => dispatch(fetchApplicationSeasonData()),
  reset: () => dispatch(resetSubmit()),
  submitNewSeason: (body: any) => dispatch(postNewSeason(body)),
  updateSeason: (body: any, id: number) => dispatch(putNewSeason(body, id)),
});

const CreateSeason = connect(
  mapStateToProps,
  mapDispatchToProps,
)(_CreateSeason);

export default CreateSeason;
