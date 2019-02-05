import { Container, Column, Row } from 'nav-frontend-grid';
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

const ApplicationReviewComponent: React.FunctionComponent<IProps> = (props) => {
  const { status } = props.applicationInfo;
  if (status === ACTION_NONE) return newApplicationLink;
  return (
    <div>
      <Fragment>
        <Column lg="12">
          <Row className="10">
            {infoPanel('Name', 'Pål Larsen')}
          </Row>
          <Row className="3">
            <Column lg="6">
              {infoPanel('E-mail', 'paalar@kul.no')}
            </Column>
            <Column lg="6">
              {infoPanel('Phone', '12345678')}
            </Column>
          </Row>
          <Row className="2">
            <Column lg="4">
              {infoPanel('Partner', 'Peter Rydberg')}
            </Column>
            <Column lg="4">
              {infoPanel('Preferred Room', 'Big one')}
            </Column>
            <Column lg="4">
              {infoPanel('Seat rollover', 'Requested')}
            </Column>
          </Row>
          <Row className="">
            <Column lg="12">
              {infoPanel('Needs', 'Lorem ipsum schmoobedi boopLorem ipsum schmoobedi boopLorem ipsum schmoobedi boopLorem ipsum schmoobedi boopLorem ipsum schmoobedi boopLorem ipsum schmoobedi boopLorem ipsum schmoobedi boopLorem ipsum schmoobedi boopLorem ipsum bedi boopLorem ipsum schm schmoobedi boopLorem ipsum schmoobedi boop.')}
            </Column>
          </Row>
            <KnappBase
              type="hoved"
            >
              {EDIT}
            </KnappBase>
        </Column>
      </Fragment>
    </div>
  );
};

export default ApplicationReviewComponent;
