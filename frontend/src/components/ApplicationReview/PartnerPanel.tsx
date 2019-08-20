import AlertStripe, { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { HjelpetekstVenstre } from 'nav-frontend-hjelpetekst';
import { LenkepanelBase } from 'nav-frontend-lenkepanel';
import PanelBase from 'nav-frontend-paneler';
import { Element } from 'nav-frontend-typografi';
import React from 'react';
import { NavLink } from 'react-router-dom';
import isEmpty from '../../utils/objectIsEmpty';
import { IApplication } from '../Application';
import { _CONNECTED_INFO, _PARTNER, _USER_NO_PARTNER } from './strings';

interface IProps {
  isAdmin?: boolean;
  partnerApplication?: IApplication;
}

const PartnerPanel: React.FunctionComponent<IProps> = (props) => {
  const { isAdmin, partnerApplication } = props;
  if (isAdmin) {
    if (partnerApplication && !isEmpty(partnerApplication)) {
      const url = `/admin/applications/${partnerApplication.id}/`;
      const link = (panelProps: any) => (
        <NavLink
            to={{ pathname: panelProps.href, state: {application: { ...partnerApplication } }}}
            className="lenkepanel lenkepanel--border"
        >
          {panelProps.children}
        </NavLink>);
      return (
        <div id="info-panel-Partner">
          <Element>{_PARTNER}</Element>
          <LenkepanelBase
            linkCreator={link}
            href={url}
          >
            {partnerApplication.user.fullname}
          </LenkepanelBase>
        </div>
      );
    }
    return (
      <div id="info-panel-Partner">
        <Element>{_PARTNER}</Element>
        <AlertStripeInfo>{_USER_NO_PARTNER}</AlertStripeInfo>
      </div>
    );
  }
  if (partnerApplication && !isEmpty(partnerApplication)) {
    return (
      <div id="info-panel-Partner">
        <Element>{_PARTNER}</Element>
        <AlertStripe type="suksess" solid={true}>{partnerApplication.user.fullname}</AlertStripe>
      </div>
    );
  }
  return (
      <div id="info-panel-Partner">
        <Element>{_PARTNER}</Element>
        <div className="panel-with-help-text">
          <PanelBase border={true} className="info-panel panel">{' '}</PanelBase>
          <HjelpetekstVenstre
            id="partner-help-text"
            tittel=""
          >
            {_CONNECTED_INFO}
          </HjelpetekstVenstre>
        </div>
      </div>
  );
};

export default PartnerPanel;
