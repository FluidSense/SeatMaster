import moment, { Moment } from 'moment';
import AlertStripe from 'nav-frontend-alertstriper';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { POST_NEW_SEASON_URL } from '../commonConstants';
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

interface IState {
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

export const setTime = (day: Moment) => (
  day.set({
    hour: 23,
    minute: 59,
  })
);

// Format to match backend model
const format = 'YYYY-MM-DD HH:mm:ss.SSS';

// tslint:disable-next-line:class-name
class _Container extends Component<{}, IState> {
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
      <>
        <Presentational
          buttonDisable={buttonDisable}
          alertApplicationEndBeforeStart={errorApplicationEndBeforeStart}
          alertPeriodEndBeforeStart={errorPeriodEndBeforeStart}
          createFields={this.createFields}
          postApplicationSeason={this.postApplicationSeason}
          alertFail={alertFail}
        />
      </>
    );
  }

  private postApplicationSeason = () => {
    const { periodEnd, periodStart, roomEnd, roomStart } = this.state;
    const body = {
      newPeriodEnd: periodEnd.format(format),
      newPeriodStart: periodStart.format(format),
      newRoomEnd: roomEnd.format(format),
      newRoomStart: roomStart.format(format),
    };
    fetch(POST_NEW_SEASON_URL, {
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'post',
    })
      .then(response => response.status)
      .then((statusCode) => {
        if (statusCode === 201) this.setState({ redirect: true });
        if (statusCode === 400) this.setState({ showAlert: true });
      });
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

const CreateSeason = connect(
  null,
  null,
)(_Container);

export default CreateSeason;
