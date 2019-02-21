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
    <>
      <Element>{title}</Element>
      <PanelBase>{text == null ? '' : text}</PanelBase>
    </>
  );
};

export default InfoPanel;
