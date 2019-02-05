import KnappBase from 'nav-frontend-knapper';
import PanelBase from 'nav-frontend-paneler';
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
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
      {infoPanel('Name', 'Pål Larsen')}
      <KnappBase
        type="hoved"
      >
        {EDIT}
      </KnappBase>
    </div>
  );
};

export default ApplicationReviewComponent;
