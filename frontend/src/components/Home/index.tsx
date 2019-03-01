import { Sidetittel } from 'nav-frontend-typografi';
import * as React from 'react';
import ApplicationReview from '../ApplicationReview';
import ApplicationSeason from '../ApplicationSeason/index';
import ApplicationStatus from '../ApplicationStatus/index';

interface IHomeProps {
  fetchSeason: () => any;
}

const _TITLE = 'My Status';

export const Home: React.FunctionComponent<IHomeProps> = (props) => {
  return (
    <div className="main-content">
      <Sidetittel className="page-title">{_TITLE}</Sidetittel>
      <ApplicationSeason />
      <ApplicationStatus />
      <ApplicationReview />
    </div>
  );
};

export default Home;
