import * as React from 'react';

import ApplicationFormContainer from '../ApplicationForm/ApplicationFormContainer';

interface IExampleProps {
  initAction: () => any;
}

export const ApplicationComponent: React.FunctionComponent<IExampleProps> = (props) => {
  return (
    <div>
      <h1>My application</h1>
      <ApplicationFormContainer />
    </div>
  );
};

export default ApplicationComponent;
