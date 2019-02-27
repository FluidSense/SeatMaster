import moment, { Moment } from 'moment';
import AlertStripe from 'nav-frontend-alertstriper';
import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { postSeason } from '../../API/calls';
import DateInputField from '../DateInputField';
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
  redirect: boolean;
  showAlert: boolean;
  [key: string]: Moment | boolean;
}

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
class CreateSeason extends Component<{}, IState> {
  constructor(props: object) {
    super(props);
    const currentTime = setTime(moment());
    const nextMonth = setTime(moment().add(1, 'month'));
    this.state = {
      periodEnd: nextMonth,
      periodStart: currentTime,
      redirect: false,
      roomEnd: nextMonth,
      roomStart: currentTime,
      showAlert: false,
    };
  }

  public componentDidUpdate = (prevState: IState) => {
    const { showAlert } = this.state;
    if (showAlert && !prevState.showAlert) {
      setTimeout(() => this.setState({ showAlert: false }), 5000);
    }
  }

  public render() {
    const { periodEnd, periodStart, roomEnd, roomStart, redirect, showAlert } = this.state;
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
      ? this.createAlert(_ERROR_MESSAGE)
      : undefined;

    if (redirect) return (<Redirect to="/admin" />);
    return (
      <Presentational
        buttonDisable={buttonDisable}
        alertApplicationEndBeforeStart={errorApplicationEndBeforeStart}
        alertPeriodEndBeforeStart={errorPeriodEndBeforeStart}
        createFields={this.createFields}
        postApplicationSeason={this.submitApplicationSeason}
        alertFail={alertFail}
      />
    );
  }

  private submitApplicationSeason = () => {
    const { periodEnd, periodStart, roomEnd, roomStart } = this.state;
    const body = {
      newPeriodEnd: periodEnd.format(format),
      newPeriodStart: periodStart.format(format),
      newRoomEnd: roomEnd.format(format),
      newRoomStart: roomStart.format(format),
    };
    postSeason(body)
      .then(() => this.setState({ redirect: true }), () => this.setState({ showAlert: true }));
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

  private createAlert = (text: string) =>
    <AlertStripe type="advarsel" solid={true}> {text} </AlertStripe>

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

export default CreateSeason;
