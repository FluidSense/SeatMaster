import { Column, Container, Row } from 'nav-frontend-grid';
import KnappBase from 'nav-frontend-knapper';
import PanelBase from 'nav-frontend-paneler';
import React, { Fragment } from 'react';
import { ILoginState } from '../Login/LoginReducer';
import { ACTION_NONE } from '../Login/Strings';
import {
  EDIT,
  EMAIL,
  NAME,
  NEEDS,
  NEW_APPLICATION,
  PARTNER,
  PHONE,
  PREFFERED_ROOM,
  SEAT_ROLLOVER,
} from './Strings';

const infoPanel = (title: string, text: string) => (
  <div>
    <h3><b>{title}</b></h3>
    <PanelBase>
      {text}
    </PanelBase>
  </div>
);

const newApplicationLink = (
  <KnappBase
    type="hoved"
  >
    {NEW_APPLICATION}
  </KnappBase>
);

interface IProps {
  applicationInfo: ILoginState;
}

const userInfo = () => (
    <Fragment>
      <Row className="10">
        {infoPanel(NAME, 'Pål Larsen')}
      </Row>
      <Row className="3">
        <Column lg="6">
          {infoPanel(EMAIL, 'paalar@kul.no')}
        </Column>
        <Column lg="6">
          {infoPanel(PHONE, '12345678')}
        </Column>
      </Row>
    </Fragment>
);

const roomInfo = () => (
  <Fragment>
    <Row className="2">
      <Column lg="4">
        {infoPanel(PARTNER, 'Peter Rydberg')}
      </Column>
      <Column lg="4">
        {infoPanel(PREFFERED_ROOM, 'Big one')}
      </Column>
      <Column lg="4">
        {infoPanel(SEAT_ROLLOVER, 'Requested')}
      </Column>
    </Row>
  </Fragment>
);

const ApplicationReviewComponent: React.FunctionComponent<IProps> = (props) => {
  const { status } = props.applicationInfo;
  if (status === ACTION_NONE) return newApplicationLink;
  return (
    <Fragment>
        {userInfo()}
        {roomInfo()}
        <Row className="">
          <Column lg="12">
            {infoPanel(NEEDS, 'Lorem ipsum schmoobedi boopLorem ipsum schmoobedi boopLorem ipsum schmoobedi boopLorem ipsum schmoobedi boopLorem ipsum schmoobedi boopLorem ipsum schmoobedi boopLorem ipsum schmoobedi boopLorem ipsum schmoobedi boopLorem ipsum bedi boopLorem ipsum schm schmoobedi boopLorem ipsum schmoobedi boop.')}
          </Column>
        </Row>
        <KnappBase
          type="hoved"
        >
          {EDIT}
        </KnappBase>
    </Fragment>
  );
};

export default ApplicationReviewComponent;
