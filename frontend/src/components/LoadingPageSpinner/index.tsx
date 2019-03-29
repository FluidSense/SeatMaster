import NavFrontendSpinner from 'nav-frontend-spinner';
import React from 'react';

export interface ISpinnerProps {
  negativ?: boolean;
  stroke?: boolean;
  transparent?: boolean;
}

const LoadingPageSpinner: React.FunctionComponent<ISpinnerProps> = (props) => {
  return(
    <div className="main-content loading-page-spinner">
      <NavFrontendSpinner {...props} />
    </div>
  );
};

export default LoadingPageSpinner;
