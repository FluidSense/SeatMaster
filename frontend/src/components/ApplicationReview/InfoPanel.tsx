import PanelBase from 'nav-frontend-paneler';
import { Element } from 'nav-frontend-typografi';
import React from 'react';

interface IProps {
  title: string;
  text?: string;
}

const InfoPanel: React.FunctionComponent<IProps> = (props) => {
  const { title, text } = props;
  return (
    <div className={'info-panel'} id={`info-panel-${title.replace(' ', '')}`}>
      <Element>{title}</Element>
      <PanelBase border={true}>{text == null ? '' : text}</PanelBase>
    </div>
  );
};

export default InfoPanel;
