import { Checkbox, Input, Select, SkjemaGruppe } from 'nav-frontend-skjema';
import { Undertittel } from 'nav-frontend-typografi';
import * as React from 'react';
import { IRoom } from '../ViewRooms';
import {
  _CHECKBOX_PARTNER,
  _CHECKBOX_SEAT,
  _LABEL_PARTNER,
  _LABEL_ROOM,
  _LABEL_SELECTOR,
  _PREFERENCES_SUB_TITLE,
} from './strings';

interface IProps {
  hasPartner: boolean;
  wantsSeat?: boolean;
  partner?: string;
  rooms: IRoom[];
  room?: string;
  isAdmin: boolean;
  updateApplicationFormData: (item: React.FormEvent) => any;
}

const title = <Undertittel>{_PREFERENCES_SUB_TITLE}</Undertittel>;

const roomsToOptions = (rooms: IRoom[]) => {
  return rooms.map(room => <option value={room.name} key={room.id}>{room.name}</option>);
};

export const ApplicationFormPreferences: React.FunctionComponent<IProps> = (props) => {
  const { updateApplicationFormData, rooms, room, hasPartner, isAdmin } = props;
  const wantsSeat = props.wantsSeat ? props.wantsSeat : false;
  const partner = props.partner ? props.partner : '';
  const onUpdateForm = (item: React.FormEvent) => updateApplicationFormData(item);
  const roomOptions = roomsToOptions(rooms);
  const initialValue = room ? room : 'initial';
  const subTitle = isAdmin ? null : title;

  const partnerCheckbox = isAdmin ? null : (
    <Checkbox
      label={_CHECKBOX_PARTNER}
      name="hasPartner"
      key="hasPartner"
      checked={hasPartner}
      onChangeCapture={onUpdateForm}
    />);
  return (
    <div className="form-preferences-info">
      {subTitle}
      <SkjemaGruppe className="preferences-sub-group">
        <Select
          label={_LABEL_ROOM}
          bredde="l"
          name="preferredRoom"
          defaultValue={initialValue}
          onChangeCapture={onUpdateForm}
        >
          <option disabled={true} value="initial" hidden={true} >{_LABEL_SELECTOR}</option>
          {roomOptions}
        </Select>
        <div className="form-partner-info">
          {partnerCheckbox}
          <Input
            label={_LABEL_PARTNER}
            bredde="L"
            defaultValue={partner}
            name="partnerUsername"
            key="partnerUsername"
            disabled={!isAdmin && !hasPartner}
            onChangeCapture={onUpdateForm}
          />
        </div>
        <div className="form-seat-rollover">
          <Checkbox
            label={_CHECKBOX_SEAT}
            name="seatRollover"
            key="seatRollover"
            checked={wantsSeat}
            onChangeCapture={onUpdateForm}
          />
        </div>
      </SkjemaGruppe>
    </div>
  );
};

export default ApplicationFormPreferences;
