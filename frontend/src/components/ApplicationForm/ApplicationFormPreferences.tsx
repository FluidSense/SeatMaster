import * as React from 'react';

import { Checkbox, Input, Select, SkjemaGruppe } from 'nav-frontend-skjema';
import { Undertittel } from 'nav-frontend-typografi';
import { IRoom } from '../ViewRooms';

interface IProps {
  updateApplicationFormData: (item: React.FormEvent) => any;
  partner: boolean;
  rooms: IRoom[];
}

const roomsToOptions = (rooms: IRoom[]) => {
  return rooms.map(room => <option value={room.name} key={room.id}>{room.name}</option>);
};

export const ApplicationFormPreferences: React.FunctionComponent<IProps> = (props) => {
  const { updateApplicationFormData, rooms } = props;
  const onUpdateForm = (item: React.FormEvent) => updateApplicationFormData(item);
  const roomOptions = roomsToOptions(rooms);
  return (
    <>
      <Undertittel>Preferences</Undertittel>
      <SkjemaGruppe>
        <Select
          label="Choose preferred room"
          bredde="xxl"
          name="room"
          defaultValue="initial"
          onChangeCapture={onUpdateForm}
        >
          <option disabled={true} value="initial" hidden={true} >Select room</option>
          {roomOptions}
        </Select>
        <Checkbox
          label="I wish to sit with my partner"
          name="partner"
          key="partner"
          onChangeCapture={onUpdateForm}
        />
        <Input
          label="Partner username"
          bredde="M"
          name="partnerUsername"
          key="partnerUsername"
          disabled={!props.partner ? true : false}
          onChangeCapture={onUpdateForm}
        />
        <Checkbox
          label="I would like to keep my seat from the previous semester"
          name="keepSeat"
          key="keepSeat"
          onChangeCapture={onUpdateForm}
        />
      </SkjemaGruppe>
    </>
  );
};

export default ApplicationFormPreferences;
