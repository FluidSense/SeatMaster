import { Row } from 'nav-frontend-grid';
import React, { Fragment } from 'react';
import ApplicationReviewContainer from '../ApplicationReview/ApplicationReviewContainer';
import ApplicationSeasonContainer from '../ApplicationSeason/ApplicationSeasonContainer';
import ApplicationStatusContainer from '../ApplicationStatus/ApplicationStatusContainer';

interface IHomeProps {
  fetchSeason: () => any;
}

export const HomeComponent: React.FunctionComponent<IHomeProps> = (props) => {
  return (
    <Fragment>
      <Row className="justify-content-center">
        <h1>My status</h1>
      </Row>
      <Row className="status-info">
        <ApplicationStatusContainer />
        <ApplicationSeasonContainer />
      </Row>
      <Row className="review">
        <ApplicationReviewContainer />
      </Row>
    </Fragment>
  );
};

export default HomeComponent;
