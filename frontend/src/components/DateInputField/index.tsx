import moment, { Moment } from 'moment';
import { Hovedknapp } from 'nav-frontend-knapper';
import Modal from 'nav-frontend-modal';
import { Input } from 'nav-frontend-skjema';
import React, { Component } from 'react';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import { DATE_FORMAT_INPUT_FIELD } from '../commonConstants';
import { setTime } from '../CreateSeason';
import { _CHOOSE_DATE } from './strings';

interface IProps {
  label: string;
  objectKey: string;
  value: Moment;
  setDate: (key: string, time: Moment) => void;
}

interface IState {
  showModal: boolean;
}

class DateInputField extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      showModal: false,
    };
  }

  public render() {
    const { showModal } = this.state;
    const { label, value } = this.props;
    return (
      <>
        <Input
          label={label}
          readOnly={true}
          value={value.format(DATE_FORMAT_INPUT_FIELD)}
          bredde="XL"
        />
        <Hovedknapp onClick={this.toggleModal}> {_CHOOSE_DATE} </Hovedknapp>
        <Modal
          isOpen={showModal}
          onRequestClose={this.toggleModal}
          closeButton={false}
          contentLabel=""
        >
          <DayPicker
            onDayClick={this.setDay}
            selectedDays={value.toDate()}
            month={value.toDate()}
          />
        </Modal>
      </>
    );
  }

  public componentDidMount = () => {
    // React wants this for rendering reasons
    Modal.setAppElement('body');
  }

  private setDay = (day: Date) => {
    const { setDate, objectKey } = this.props;
    const dateToMoment = setTime(moment(day));
    // Sends data to parent to set state
    setDate(objectKey, dateToMoment);
    this.toggleModal();
  }

  private toggleModal = () => {
    const { showModal } = this.state;
    this.setState({ showModal: !showModal });
  }
}

export default DateInputField;
