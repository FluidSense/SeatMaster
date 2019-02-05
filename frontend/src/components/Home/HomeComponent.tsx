import * as React from 'react';
import ApplicationReviewContainer from '../ApplicationReview/ApplicationReviewContainer';
import ApplicationSeasonContainer from '../ApplicationSeason/ApplicationSeasonContainer';
import ApplicationStatusContainer from '../ApplicationStatus/ApplicationStatusContainer';

interface IHomeProps {
  fetchSeason: () => any;
}

export const HomeComponent: React.FunctionComponent<IHomeProps> = (props) => {
  return (
    <div>
      <h1>My status</h1>
      <ApplicationStatusContainer />
      <ApplicationSeasonContainer />
      <ApplicationReviewContainer />
    </div>
  );
};

export default HomeComponent;
