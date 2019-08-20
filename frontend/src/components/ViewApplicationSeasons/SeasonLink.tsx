import moment from 'moment';
import EtikettBase from 'nav-frontend-etiketter';
import { LenkepanelBase } from 'nav-frontend-lenkepanel';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import React, { FunctionComponent } from 'react';
import { NavLink } from 'react-router-dom';
import { formatLink } from '../../utils/timeFormatter';
import { IApplicationSeason } from '../ApplicationSeason/reducer';
import { EtikettTypes } from '../ApplicationStatus/Presentational';
import { ROUTE_TO } from './constants';
import {
  _LINK_ENDED,
  _LINK_ENDING,
  _LINK_NOT_OPEN,
  _LINK_OPEN,
  _LINK_OPENING,
  _LINK_SEASON_ENDED,
  _LINK_SEASON_STARTED,
  _LINK_STATUS,
  _SEASON_NUMBER,
} from './strings';

interface IProps {
  season: IApplicationSeason;
}

const linkStatus = (id: number, text: string, type: EtikettTypes) => (
  <div className="link-current">
    <Element>{_SEASON_NUMBER(id)}</Element>
    <EtikettBase type={type}>{text}</EtikettBase>
  </div>
);

const linkEnding = (title: string, text?: string) => (
  <div className="link-ending">
    <Element>{title}</Element>
    <Normaltekst>{text}</Normaltekst>
  </div>);

const linkOpening = (title: string, text?: string) => (
  <div className="link-opening">
    <Element>{title}</Element>
    <Normaltekst>{text}</Normaltekst>
  </div>);

const SeasonLink: FunctionComponent<IProps> = (props) => {
  const { id } = props.season;
  const start = props.season.applicationPeriodStart;
  const end = props.season.applicationPeriodEnd;
  const currentTime = moment();
  let seasonOpened = linkOpening(_LINK_SEASON_STARTED, formatLink(start));
  let seasonEnding = linkEnding(_LINK_SEASON_ENDED, formatLink(end));
  let seasonStatus = linkStatus(id, _LINK_ENDED, 'advarsel');
  if (end > currentTime) {
    seasonStatus = linkStatus(id, _LINK_OPEN, 'suksess');
    seasonEnding = linkEnding(_LINK_ENDING, formatLink(end));
    if (start > currentTime) {
      seasonOpened = linkOpening(_LINK_OPENING, formatLink(start));
      seasonStatus = linkStatus(id, _LINK_NOT_OPEN, 'fokus');
    } else {
      seasonOpened = linkOpening(_LINK_SEASON_STARTED, formatLink(start));
    }
  }
  const link = (panelProps: any) => (
    <NavLink
      to={{ pathname: panelProps.href, state: {season: { ...props.season } }}}
      className="lenkepanel lenkepanel--border"
    >
      {panelProps.children}
    </NavLink>);
  return (
    <LenkepanelBase
      key={id}
      linkCreator={link}
      href={`${ROUTE_TO}${id}`}
    >
      <div className="lenkepanel-seasons">
        {seasonStatus}
        {seasonOpened}
        {seasonEnding}
      </div>
    </LenkepanelBase>);
};

export default SeasonLink;
