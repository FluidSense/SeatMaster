import { Sidetittel } from 'nav-frontend-typografi';
import * as React from 'react';
import ApplicationReview from '../ApplicationReview';
import ApplicationSeason from '../ApplicationSeason/index';
import ApplicationStatus from '../ApplicationStatus/index';
import './home.css';

interface IHomeProps {
  fetchSeason: () => any;
}

const title = 'My Status';

export const Home: React.FunctionComponent<IHomeProps> = (props) => {
  return (
    <div id="student-application">
      <Sidetittel>{title}</Sidetittel>
      <ApplicationSeason />
      <ApplicationStatus />
      <ApplicationReview />
    </div>
  );
};

export default Home;
