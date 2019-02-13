import * as React from 'react';
import { Link } from 'react-router-dom';

import KnappBase from 'nav-frontend-knapper';

interface IExampleProps {
  initAction: () => any;
}

export const Application: React.FunctionComponent<IExampleProps> = (props) => {
  return (
    <div>
      <h1>My application</h1>
      <Link to="/home">
        <KnappBase type="hoved" htmlType="button" id="submitButton">Submit</KnappBase>
      </Link>
    </div>
  );
};

export default Application;
