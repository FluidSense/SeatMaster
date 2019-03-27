import NavFrontendSpinner from 'nav-frontend-spinner';
import React from 'react';

const LoadingPageSpinner: React.FunctionComponent = () => {
  return(
    <div className="main-content loading-page-spinner">
      <NavFrontendSpinner />
    </div>
  );
};

export default LoadingPageSpinner;
