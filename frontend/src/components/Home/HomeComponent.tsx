import { Container, Column, Row } from 'nav-frontend-grid';
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
      <Container>
        <Row className="mx-10">
          <Column lg="8">
            <h1>My status</h1>
          </Column>
        </Row>
          <Column lg="10"/>
        <Row className="status-info">
          <Column lg="12">
            <ApplicationStatusContainer />
          </Column>
          <Column lg="12">
            <ApplicationSeasonContainer />
          </Column>
        </Row>
        <Row className="review">
          <Column lg="12">
              <ApplicationReviewContainer />
          </Column>
        </Row>
      </Container>
    </div>
  );
};

export default HomeComponent;
