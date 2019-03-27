import moment, { Moment } from 'moment';
import AlertStripe, { AlertStripeBaseProps } from 'nav-frontend-alertstriper';
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
import { postNewSeason, putNewSeason } from './actions';
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
  periodStart: Moment;
  periodEnd: Moment;
  roomStart: Moment;
  roomEnd: Moment;
  showAlert: boolean;
  [key: string]: Moment | boolean;
}

export interface IStateProps {
  currentSeason?: IApplicationSeason;
  id: number;
  submitted?: boolean;
}

export interface IDispatchProps {
  submitNewSeason: (season: IPostApplicationSeason) =>
    ThunkAction<Promise<void>, {}, {}, AnyAction>;
  fetchSeason: () => void;
  updateSeason: (body: any, id: number) => void;
}

type Props = IStateProps & IDispatchProps;
type AlertStripeTypes = 'advarsel' | 'suksess' | 'info' | 'nav-ansatt' | 'stopp';

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
      periodEnd: nextMonth,
      periodStart: currentTime,
      roomEnd: nextMonth,
      roomStart: currentTime,
      showAlert: false,
    };
  }

  public componentDidMount = async () => {
    this.props.fetchSeason();
  }

  public componentDidUpdate = (prevProps: Props) => {
    const { showAlert } = this.state;
    const { submitted, currentSeason } = this.props;
    if (currentSeason && prevProps !== this.props) {
      this.setState({
        periodEnd: currentSeason.applicationPeriodEnd,
        periodStart: currentSeason.applicationPeriodStart,
        roomEnd: currentSeason.end,
        roomStart: currentSeason.start,
      });
    }
    if (!submitted && !prevProps.submitted === undefined) {
      this.setState({ showAlert: true });
    }
    if (showAlert) {
      setTimeout(() => this.setState({ showAlert: false }), 5000);
    }
  }

  public render() {
    const { periodEnd, periodStart, roomEnd, roomStart, showAlert } = this.state;
    const { submitted, currentSeason, id } = this.props;
    if (submitted) return (<Redirect to="/admin/applications" />);
    const errorPeriodEndBeforeStart =
      periodEnd <= periodStart
        ? errorObjectSeasonEndTooEarly
        : undefined;

    const errorApplicationEndBeforeStart =
      roomEnd <= roomStart
        ? errorObjectRoomEndTooEarly
        : undefined;

    const buttonDisable =
      errorPeriodEndBeforeStart !== undefined
      || errorApplicationEndBeforeStart !== undefined;

    const alertFail = showAlert
      ? this.createAlert(_ERROR_MESSAGE, 'advarsel')
      : undefined;
    return (
      <Presentational
        buttonDisable={buttonDisable}
        alertApplicationEndBeforeStart={errorApplicationEndBeforeStart}
        alertPeriodEndBeforeStart={errorPeriodEndBeforeStart}
        createFields={this.createFields}
        postApplicationSeason={this.submitApplicationSeason}
        updateApplicationSeason={this.updateApplicationSeason}
        alert={alertFail}
        season={currentSeason}
        id={id}
      />
    );
  }

  private updateApplicationSeason = () => {
    const { periodEnd, periodStart, roomEnd, roomStart } = this.state;
    const { id } = this.props;
    const body = {
      newPeriodEnd: periodEnd.format(format),
      newPeriodStart: periodStart.format(format),
      newRoomEnd: roomEnd.format(format),
      newRoomStart: roomStart.format(format),
    };
    this.props.updateSeason(body, id);
  }

  private submitApplicationSeason = () => {
    const { periodEnd, periodStart, roomEnd, roomStart } = this.state;
    const body = {
      newPeriodEnd: periodEnd.format(format),
      newPeriodStart: periodStart.format(format),
      newRoomEnd: roomEnd.format(format),
      newRoomStart: roomStart.format(format),
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

  private createAlert = (text: string, type: AlertStripeTypes) =>
    <AlertStripe type={type} solid={true}> {text} </AlertStripe>

  private createFields = (index: number, end: number) => {
    const { periodStart, periodEnd, roomStart, roomEnd } = this.state;
    const stateEntries = Object.entries({ periodStart, periodEnd, roomStart, roomEnd });
    const fields = [];
    for (let i = index; i < end; i += 1) {
      fields.push(this.createDateInputField(
        inputTextArray[i],
        stateEntries[i][0],
        stateEntries[i][1],
      ));
    }
    return fields;
  }

  private setDate = (key: string, time: Moment) => this.setState({ [key]: time });
}

const mapStateToProps = (state: IStore) => ({
  currentSeason: state.applicationSeason.currentSeason,
  id: state.applicationSeason.id,
  submitted: state.applicationSeason.submitted,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
  fetchSeason: () => dispatch(fetchApplicationSeasonData()),
  submitNewSeason: (body: any) => dispatch(postNewSeason(body)),
  updateSeason: (body: any, id: number) => dispatch(putNewSeason(body, id)),
});

const CreateSeason = connect(
  mapStateToProps,
  mapDispatchToProps,
)(_CreateSeason);

export default CreateSeason;
