import NavFrontendSpinner from 'nav-frontend-spinner';
import { Sidetittel } from 'nav-frontend-typografi';
import React from 'react';
import { ISpinnerProps } from '.';

interface IProps {
  title: string;
  types?: ISpinnerProps;
}

export const TitleAndSpinner: React.FunctionComponent<IProps> = (props) => {
  return (
    <div className="main-content">
      <Sidetittel>{props.title}</Sidetittel>
      <NavFrontendSpinner {...props.types} />
    </div>
  );
};
