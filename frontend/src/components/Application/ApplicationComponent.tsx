import * as React from 'react';

import ApplicationFormComponent from './../ApplicationForm/ApplicationFormComponent';

interface IExampleProps {
  initAction: () => any;
}

export const ApplicationComponent: React.FunctionComponent<IExampleProps> = (props) => {
  return (
    <div>
      <h1>My application</h1>
      <ApplicationFormComponent username="loff"/>
    </div>
  );
};
