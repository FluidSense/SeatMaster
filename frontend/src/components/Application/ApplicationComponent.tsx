import * as React from 'react';

import ApplicationFormComponent from './../ApplicationForm/ApplicationFormComponent';

interface IExampleProps {
  initAction: () => any;
}

export const ApplicationComponent: React.FunctionComponent<IExampleProps> = (props) => {
  return (
    <div>
      <h1>My application</h1>
      <ApplicationFormComponent
        username="loffsen"
        fullname="Loffen Lofferino"
        email="yo@yo.no"
        phone="45234512"
        status="Project"
      />
    </div>
  );
};
