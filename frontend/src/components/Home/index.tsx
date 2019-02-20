import * as React from 'react';
import { Link } from 'react-router-dom';
import ApplicationReview from '../ApplicationReview';
import _Container from '../ApplicationSeason/index';
import Container from '../ApplicationStatus/index';

import KnappBase from 'nav-frontend-knapper';

interface IHomeProps {
  fetchSeason: () => any;
}

export const Home: React.FunctionComponent<IHomeProps> = (props) => {
  return (
    <div>
      <h1>My status</h1>
      <_Container />
      <Container />
      <ApplicationReview />
    </div>
  );
};

export default Home;
